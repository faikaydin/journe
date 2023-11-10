import sqlite3
from common.app_config import *
from src.utils import read_sql_command

"""
this class handles the entire database connections & payload management 
    
"""

class JourneConnection:

    def __init__(self):
        self.conn = JourneConnection.connect_to_journe_core()  # create a new db or connect to an existing one
        self.cursor = self.conn.cursor()

    @staticmethod
    def connect_to_journe_core():
        return sqlite3.connect(DATABASE_PATH)

    # wipes the existing journe core db/starts one from scratch and creates a brand-new schema
    def create_new_journe_core(self):
        # retrieve sql command for core creation
        core_sql = read_sql_command(JOURNE_CORE_CREATE_SQL_PATH)
        # execute
        self.cursor.executescript(core_sql)
        print("Fresh Journe db created")

    """
    sends journe object to the db. 
    """
    def send_payload(self, payload_obj):
        payload_sql = payload_paths[payload_obj.journe_object_type]['SEND']  # getting the sql command path
        sql_command = read_sql_command(payload_sql)  # getting the sql command
        self.cursor.execute(sql_command, payload_obj.to_payload())  # execute
        self.conn.commit()
        print(f"{payload_obj.to_payload()[f'{payload_obj.journe_object_type}_title']} sent to journe core!")

    """
    object_type = string - task, pot, block
    object_id = string - passing object_id to get the object
    object_title = string - passing object_title to get the object
    read_all = bool - reads in entire object type data
    """
    def read_payload(self, object_type, object_id=None, object_title=None, read_all=False):
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
        self.cursor.execute(sql, query_dict)
        return self.cursor.fetchall()

    """
    removes the queried object from db
    """
    def remove_payload(self, object_type, object_id=None, object_title=None):
        sql_command_path = payload_paths[object_type]['REMOVE']
        sql_command = read_sql_command(sql_command_path)  # getting the sql command
        query_dict = {'_id': object_id, '_title': object_title}
        self.cursor.execute(sql_command, query_dict)  # execute
        self.conn.commit()
        print(f"{object_id}{object_title} REMOVED from journe core!")

    def get_table_info(self, table_name):
        # Execute a query to get the column names
        self.cursor.execute(f"PRAGMA table_info({table_name})")
        # Fetch all the results
        columns = self.cursor.fetchall()
        return [column[1] for column in columns]

    def is_pot_exists(self, pot_title):
        sql = f'select pot_id from pot where pot_title="{pot_title}"'
        self.cursor.execute(sql)
        return len(self.cursor.fetchall()) > 0  # if there are one or more instances found
