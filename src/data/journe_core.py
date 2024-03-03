import sqlite3
from os.path import exists
from common.app_config import *
from src.utils import read_sql_command

"""
this class handles the entire database connections & payload management 


ALL functions apart from create_new_journe_core follow the following pattern:

    1) establish database instruction (forming sql)
    2) execute query
        2.1) connection generates cursor
        2.2) execute function
        2.3) if fetch possible, fetch result 
        2.4) commit
        2.5) close cursor
    3) logging
    4) return 
"""


class JourneConnection:

    """
    there are two scenarios:
        1) there is no db ... in which case:
            1.1) connect_to_journe_core runs and generates an empty .db
            1.2) following it up create_new_journe_core runs and creates the fresh journe core
        2) there already exists a db - in which case we just connect to it!
    """
    def __init__(self):
        create_new_journe_core = not exists(DATABASE_PATH)  # if a journe db doesn't exist create a new one
        self.conn = JourneConnection.connect_to_journe_core()  # connect to journe core
        if create_new_journe_core:  # if a journe db doesn't exist create a new one
            self.create_new_journe_core()

    @staticmethod
    def connect_to_journe_core():
        print(DATABASE_PATH)
        return sqlite3.connect(DATABASE_PATH, check_same_thread=False)

    # wipes the existing journe core db/starts one from scratch and creates a brand-new schema
    def create_new_journe_core(self):
        cursor = self.conn.cursor()
        # retrieve sql command for core creation
        core_sql = read_sql_command(JOURNE_CORE_CREATE_SQL_PATH)
        # execute
        cursor.executescript(core_sql)
        print("Fresh Journe db created")
        self.conn.commit()
        cursor.close()

    # responsible for part 2 of class level docstring above - execute query
    def execute(self, sql, bindings=None, is_fetch=False):
        if bindings is None:
            bindings = {}
        cursor = self.conn.cursor()
        cursor.execute(sql, bindings)
        result = cursor.fetchall() if is_fetch else None
        self.conn.commit()
        cursor.close()
        return result

    """
    sends journe object or a json_payload to the db. 
    """
    def send_payload(self, payload_obj):
        if type(payload_obj) != list:  # if we want to send a single journe_object
            # sql prep
            payload_sql = payload_paths[payload_obj.journe_object_type]['SEND']  # getting the sql command path
            sql_command = read_sql_command(payload_sql)  # getting the sql command
            # execute
            self.execute(sql_command, bindings=payload_obj.to_payload())
            # logging
            print(f"{payload_obj.to_payload()[f'{payload_obj.journe_object_type}_id']} sent to journe core!")
        else:
            if len(payload_obj) > 0:
                # sql prep
                obj_type = list(payload_obj[0].keys())[0].split("_")[0]  # getting the name of the object type by keys
                payload_sql = payload_paths[obj_type]['SEND']  # getting the sql command path
                sql_command = read_sql_command(payload_sql)  # getting the sql command
                # execute
                for payload in payload_obj:
                    print(payload)
                    self.execute(sql_command, bindings=payload)
                # logging
                print(f"{len(payload_obj)} {obj_type} sent to journe core!")

    """
    object_type = string - task, pot
    object_id = string - passing object_id to get the object
    object_title = string - passing object_title to get the object
    read_all = bool - reads in entire object type data
    
    returns [{variables_1}, {variables_2}, ...]
    """
    def read_payload(self, object_type, object_id=None, object_title=None, read_all=False):
        if read_all:
            # sql prep
            sql_command_path = payload_paths[object_type]['READ']['ALL']  # read all
            query_dict = {}
        else:
            # sql prep
            sql_command_path = payload_paths[object_type]['READ']['UNIT']  # read single record
            query_dict = {'_id': object_id, '_title': object_title}
        sql = read_sql_command(sql_command_path)
        # execute
        return self.execute(sql, is_fetch=True, bindings=query_dict)

    def update_objects(self, object_type, query_dict):
        # prep sql
        sql_command_path = payload_paths[object_type]['UPDATE']
        sql = read_sql_command(sql_command_path)
        # execute
        self.execute(sql, bindings=query_dict)
        # log
        print(object_type + ' updated')

    """
    removes the queried object from db
    """
    def remove_payload(self, object_type, object_id=None, object_title=None):
        # if we are removing a pot - all child tasks need to go to task platter
        if object_type != 'task':  # if it is a pot we must strip the tasks associated
            self.rectify_tasks_for_parent_removal(object_title, object_id)
        # removal process
        # prep sql
        sql_command_path = payload_paths[object_type]['REMOVE']
        sql_command = read_sql_command(sql_command_path)  # getting the sql command
        query_dict = {'_id': object_id, '_title': object_title}
        # execute
        self.execute(sql_command, bindings=query_dict)  # execute
        # log
        print(f"{object_id}{object_title} REMOVED from journe core!")

    # Execute get the column names
    def get_table_info(self, table_name):
        # sql prep
        sql = f"PRAGMA table_info({table_name})"
        # execute
        columns = self.execute(sql, is_fetch=True)
        return [column[1] for column in columns]

    def is_pot_exists(self, pot_title):
        # prep sql
        sql = f'select pot_id from pot where pot_title="{pot_title}"'
        # execute
        result = len(self.execute(sql, is_fetch=True)) > 0
        return result  # if there are one or more instances found

    def rectify_tasks_for_parent_removal(self, _title, _id):
        # if passing in pot title instead of ID getting pot ID
        if _id:
            pass
        else:
            _id = self.read_payload('pot', object_title=_title)[0][0]
        # reassigning all tasks with removed pot to task_platter-ID
        cursor = self.conn.cursor()
        default_id = self.read_payload('pot', object_title='task_platter')[0][0]
        cursor.execute(f'update task set '
                       f'task_pot_id="{default_id}" '
                       f'where task_pot_id="{_id}"')
        self.conn.commit()
        cursor.close()
