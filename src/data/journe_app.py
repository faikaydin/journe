from src.data.journe_core import *
from src.task import *
from src.pot import *
from src.utils import read_json_payload
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

    def load_json(self, json_payload_path):
        print('############# LOADING JSON #############')
        self.reset_local()  # reset local objects in memory
        self.reset_db()  # reset db - nuke all
        tasks, pots = read_json_payload(json_payload_path)  # read in json objects
        self.journe_connection.send_payload(tasks)  # sending tasks to journe db!
        self.journe_connection.send_payload(pots)  # sending pots to journe db!
        self.sync_local_with_db()  # sync the local with all

    def sync_local_with_db(self):
        _tasks = {}
        for _task in self.read('task', read_all=True):
            _tasks[_task['task_id']] = Task(task_id=_task['task_id'],
                                            task_title=_task['task_title'],
                                            task_description=_task['task_description'],
                                            task_duration=_task['task_duration'],
                                            task_pot=_task['task_pot_id'])
        _pots = {}
        for _pot in self.read('pot', read_all=True):
            _pots[_pot['pot_id']] = Pot(pot_id=_pot['pot_id'],
                                        pot_title=_pot['pot_title'],
                                        pot_description=_pot['pot_description'])
        # update Journe instance
        self.pots = _pots
        self.tasks = _tasks
        print("Local Synced With DB")

    def add_task(self, task_id=None, task_title='', task_duration=10, task_pot='task_platter'):
        if self.journe_connection.is_pot_exists(task_pot):
            task_pot = self.read('pot', _title=task_pot)['pot_id']  # get task's pot id from human-readable pot title
        else:
            task_pot = self.read('pot', _title='task_platter')['pot_id']  # if pot doesn't exist default task_platter
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
        keys = self.journe_connection.get_table_info(journe_object_type)
        values = self.journe_connection.read_payload(object_type=journe_object_type,
                                                     object_id=_id,
                                                     object_title=_title,
                                                     read_all=read_all)
        if read_all:
            return [dict(zip(keys, value)) for value in values]
        return [dict(zip(keys, value)) for value in values][0]  # if we are after one value return the single dict
