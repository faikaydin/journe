import sqlite3
from common.app_config import DATABASE_PATH, JOURNE_CORE_CREATE_SQL_PATH
from src.utils import read_data_structure_sql

"""
this file holds the functions to:
    
    1) create_new_journe_core -> creates a new, empty journe db with core tables 
                                (if db already exists, completely wipes the db) 
    

"""


def create_new_journe_core():
    # create a new db or connect to an existing one
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    # retrieve sql command for core creation
    core_sql = read_data_structure_sql(JOURNE_CORE_CREATE_SQL_PATH)
    # execute
    cursor.executescript(core_sql)
    # close the conn
    conn.close()
    print(f"{DATABASE_PATH} created with empty TASK & POT tables")
    return
