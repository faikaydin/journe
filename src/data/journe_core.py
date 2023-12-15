import sqlite3
from os.path import exists
from common.app_config import *
from src.utils import read_sql_command

"""
this class handles the entire database connections & payload management 
    
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

    """
    sends journe object or a json_payload to the db. 
    """
    def send_payload(self, payload_obj):
        cursor = self.conn.cursor()
        if type(payload_obj) != list:  # if we want to send a single journe_object
            payload_sql = payload_paths[payload_obj.journe_object_type]['SEND']  # getting the sql command path
            sql_command = read_sql_command(payload_sql)  # getting the sql command
            cursor.execute(sql_command, payload_obj.to_payload())  # execute
            if payload_obj.journe_object_type != 'block':
                print(f"{payload_obj.to_payload()[f'{payload_obj.journe_object_type}_title']} sent to journe core!")
            else:
                print(f"{payload_obj.to_payload()[f'{payload_obj.journe_object_type}_id']} sent to journe core!")

        else:
            if len(payload_obj) > 0:
                obj_type = list(payload_obj[0].keys())[0].split("_")[0]  # getting the name of the object type by keys
                payload_sql = payload_paths[obj_type]['SEND']  # getting the sql command path
                sql_command = read_sql_command(payload_sql)  # getting the sql command
                for payload in payload_obj:
                    cursor.execute(sql_command, payload)  # execute
                print(f"{len(payload_obj)} {obj_type} sent to journe core!")
        self.conn.commit()  # commit transaction
        cursor.close()

    """
    object_type = string - task, pot, block
    object_id = string - passing object_id to get the object
    object_title = string - passing object_title to get the object
    read_all = bool - reads in entire object type data
    
    returns [{variables_1}, {variables_2}, ...]
    """
    def read_payload(self, object_type, object_id=None, object_title=None, read_all=False):
        cursor = self.conn.cursor()
        # get all data
        if read_all:
            # retrieve sql command for core creation
            sql_command_path = payload_paths[object_type]['READ']['ALL']
            query_dict = {}
        else:
            sql_command_path = payload_paths[object_type]['READ']['UNIT']
            query_dict = {'_id': object_id, '_title': object_title}
        # execute
        sql = read_sql_command(sql_command_path)
        cursor.execute(sql, query_dict)
        result = cursor.fetchall()
        self.conn.commit()
        cursor.close()
        return result

    def update_objects(self, object_type, query_dict):
        cursor = self.conn.cursor()
        # retrieve sql command for update
        sql_command_path = payload_paths[object_type]['UPDATE']
        # execute
        sql = read_sql_command(sql_command_path)
        cursor.execute(sql, query_dict)
        print(object_type + ' updated')
        self.conn.commit()
        cursor.close()
        return


    """
    removes the queried object from db
    """
    def remove_payload(self, object_type, object_id=None, object_title=None):
        cursor = self.conn.cursor()
        if object_type == 'pot':  # if it is a pot we must strip the tasks associated
            if object_id:
                _pot_id = object_id
            else:
                _pot_id = self.read_payload('pot', object_title=object_title)[0][0]
            self.rectify_pot_removal(_pot_id)  # THIS IS AN ALTER WE NEED TO CHANGE
        # removal process
        sql_command_path = payload_paths[object_type]['REMOVE']
        sql_command = read_sql_command(sql_command_path)  # getting the sql command
        query_dict = {'_id': object_id, '_title': object_title}
        cursor.execute(sql_command, query_dict)  # execute
        self.conn.commit()
        cursor.close()
        print(f"{object_id}{object_title} REMOVED from journe core!")

    def get_table_info(self, table_name):
        cursor = self.conn.cursor()
        # Execute a query to get the column names
        cursor.execute(f"PRAGMA table_info({table_name})")
        # Fetch all the results
        columns = cursor.fetchall()
        self.conn.commit()
        cursor.close()
        return [column[1] for column in columns]

    def is_pot_exists(self, pot_title):
        cursor = self.conn.cursor()
        sql = f'select pot_id from pot where pot_title="{pot_title}"'
        cursor.execute(sql)
        result = len(cursor.fetchall()) > 0
        self.conn.commit()
        cursor.close()
        return result # if there are one or more instances found

    def rectify_pot_removal(self, pot_id):
        cursor = self.conn.cursor()
        default_id = self.read_payload('pot', object_title='task_platter')[0][0]
        cursor.execute(f'update task set '
                       f'task_pot_id="{default_id}" '
                       f'where task_pot_id="{pot_id}"')
        self.conn.commit()
        cursor.close()
