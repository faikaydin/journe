import sqlite3
from common.app_config import DATABASE_PATH, JOURNE_CORE_CREATE_SQL_PATH
from src.utils import read_sql_command

"""
this file holds the functions to:
    
    1) create_new_journe_core -> creates a new, empty journe db with core tables 
                                (if db already exists, completely wipes the db) 
    

"""


class JourneConnection:

    def __init__(self):
        self.conn = JourneConnection.connect_to_journe_core()  # create a new db or connect to an existing one
        self.cursor = self.conn.cursor()

    @staticmethod
    def connect_to_journe_core():
        return sqlite3.connect(DATABASE_PATH)

    # wipes the existing journe core db/starts one from scratch and creates a brand new schema
    def create_new_journe_core(self):
        # retrieve sql command for core creation
        core_sql = read_sql_command(JOURNE_CORE_CREATE_SQL_PATH)
        # execute
        self.cursor.executescript(core_sql)
        print(f"{DATABASE_PATH} created with empty TASK & POT tables")
