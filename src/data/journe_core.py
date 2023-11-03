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
        print(f"{DATABASE_PATH} created with empty TASK & POT tables")

    def task_payload_to_core(self, task):
        # retrieve sql command for core creation
        task_payload_sql = read_sql_command(JOURNE_CORE_TASK_PAYLOAD_SQL_PATH)
        # execute
        self.cursor.execute(task_payload_sql, task.to_payload())  # execute
        self.conn.commit()
        print(f"{task.to_payload()['task_title']} sent to journe core!")

    def read_tasks(self):
        # retrieve sql command for core creation
        sql = read_sql_command(JOURNE_CORE_READ_TASKS)
        # execute
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def read_pots(self):
        # retrieve sql command for core creation
        sql = read_sql_command(JOURNE_CORE_READ_POTS)
        # execute
        self.cursor.execute(sql)
        return self.cursor.fetchall()

