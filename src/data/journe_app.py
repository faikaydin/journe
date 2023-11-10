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
        # sync the db with local
        self.sync_local_with_db()

    # resets db to wipe clean
    def reset_db(self):
        self.journe_connection.create_new_journe_core()

    def reset_local(self):
        self.tasks = {}
        self.pots = {}

    def sync_local_with_db(self):
        _tasks = {}
        for _task in self.read('task', read_all=True):
            _tasks[_task[0]] = Task(*_task)
        _pots = {}
        for _pot in self.read('pot', read_all=True):
            _pots[_pot[0]] = Pot(*_pot)
        # update Journe instance
        self.pots = _pots
        self.tasks = _tasks
        print("Local Synced With DB")

    def add_task(self, task_id=None, task_title='', task_duration=10, task_pot='task_platter'):
        if self.journe_connection.is_pot_exists(task_pot):
            task_pot = self.read('pot', _title=task_pot)[0][0]  # get task's pot id from its human-readable pot title
        else:
            task_pot = self.read('pot', _title='task_platter')[0][0]  # if pot doesn't exist default to task_platter
        task_obj = Task(task_id, task_title, task_duration, task_pot)  # init task object
        self.journe_connection.send_payload(task_obj)  # send object payload to core
        self.tasks[task_obj.task_id] = task_obj  # create a copy of the task object in memory

    def add_pot(self, pot_id=None, pot_title='', pot_description="just some delicious tasks :P"):
        pot_obj = Pot(pot_id, pot_title, pot_description)  # init pot object
        self.journe_connection.send_payload(pot_obj)  # send object payload to core
        self.pots[pot_obj.pot_id] = pot_obj  # create a copy of the pot object in memory

    def remove(self, journe_object_type, _id='', _title=''):
        # removing from db
        self.journe_connection.remove_payload(journe_object_type, object_id=_id, object_title=_title)
        # resync local
        self.sync_local_with_db()

    def read(self, journe_object_type, _id='', _title='', read_all=False):
        return self.journe_connection.read_payload(object_type=journe_object_type,
                                                   object_id=_id,
                                                   object_title=_title,
                                                   read_all=read_all)
