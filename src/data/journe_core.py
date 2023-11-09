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

    def send_payload(self, payload_sql, payload_obj):
        self.cursor.execute(payload_sql, payload_obj.to_payload())  # execute
        self.conn.commit()

    def task_payload_to_core(self, task):
        # retrieve sql command
        task_payload_sql = read_sql_command(JOURNE_CORE_TASK_PAYLOAD_SQL_PATH)
        # execute
        self.send_payload(task_payload_sql, task)
        print(f"{task.to_payload()['task_title']} sent to journe core!")

    def pot_payload_to_core(self, pot):
        # retrieve sql command
        pot_payload_sql = read_sql_command(JOURNE_CORE_POT_PAYLOAD_SQL_PATH)
        # execute
        self.send_payload(pot_payload_sql, pot)
        print(f"{pot.to_payload()['pot_title']} sent to journe core!")

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

    def get_pot_id_from_pot_title(self, query_dict):
        # retrieve sql command for core creation
        sql = read_sql_command(JOURNE_CORE_GET_POT_ID_FROM_POT_TITLE)
        # execute
        self.cursor.execute(sql, query_dict)
        return self.cursor.fetchall()

    def get_pot_title_from_pot_id(self, query_dict):
        # retrieve sql command for core creation
        sql = read_sql_command(JOURNE_CORE_GET_POT_TITLE_FROM_POT_ID)
        # execute
        self.cursor.execute(sql)
        return self.cursor.fetchall()


