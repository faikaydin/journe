from src.data.journe_core import *
from src.task import *
"""
overall app class - wrappers
"""


class Journe:

    def __init__(self):

        self.journe_connection = JourneConnection()  # establish connection to db or create a new one if no db exists
        self.tasks = {}  # dict to store tasks in memory

    # resets db to wipe clean
    def reset_db(self):
        self.journe_connection.create_new_journe_core()

    def add_task(self, task_title, task_duration=10, task_pot=0):
        task_obj = Task(task_title, task_duration, task_pot)  # init task object
        self.journe_connection.task_payload_to_core(task_obj)  # send object to payload
        self.tasks[task_obj.task_id] = task_obj  # create a copy of the task object in memory

    def read_tasks(self):
        return self.journe_connection.read_tasks()

    def read_pots(self):
        return self.journe_connection.read_pots()



