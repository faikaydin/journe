from src.data.journe_core import *
from src.task import *
from src.pot import *
"""
overall app class - wrappers
"""


class Journe:

    def __init__(self):

        self.journe_connection = JourneConnection()  # establish connection to db or create a new one if no db exists
        self.tasks = {}  # dict to store tasks in memory
        self.pots = {}  # dict to store pots in memory

    # resets db to wipe clean
    def reset_db(self):
        self.journe_connection.create_new_journe_core()

    def add_task(self, task_title, task_duration=10, task_pot='task_platter'):
        task_pot = self.read('pot', _title=task_pot)[0][0]  # get task's pot id from its human readable pot title
        task_obj = Task(task_title, task_duration, task_pot)  # init task object
        self.journe_connection.send_payload(task_obj)  # send object payload to core
        self.tasks[task_obj.task_id] = task_obj  # create a copy of the task object in memory

    def add_pot(self, pot_title, pot_description="just some delicious tasks :P"):
        pot_obj = Pot(pot_title, pot_description)  # init pot object
        self.journe_connection.send_payload(pot_obj)  # send object payload to core
        self.pots[pot_obj.pot_id] = pot_obj  # create a copy of the pot object in memory

    def read(self, journe_object_type, _id=None, _title=None, read_all=False):
        return self.journe_connection.read_payload(object_type=journe_object_type,
                                                   object_id=_id,
                                                   object_title=_title,
                                                   read_all=read_all)
    #
    # def get_pot_id_from_pot_title(self, pot_title):
    #     return self.journe_connection.get_pot_id_from_pot_title({'pot_title': pot_title})
    #
    # def get_pot_title_from_pot_id(self, pot_id):
    #     return self.journe_connection.get_pot_id_from_pot_title({'pot_title': pot_id})
    #
    # def read_pots(self):
    #     return self.journe_connection.read_pots()



