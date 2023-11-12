from src.data.journe_app import *
from common.app_config import DUMMY_DB_JSON_PATH

journe = Journe()  # create Journe App Instance
journe.load_json(json_payload_path=DUMMY_DB_JSON_PATH)  # setting up our dummy instance :)
print(journe)

# journe.reset_db()  # reset db ... nuke!
# journe.sync_local_with_db()  # syncing db with local
# #####################################################
# journe.add_task(None, 'poopieees', 24)
# journe.add_pot(None, 'cat town', 'all cat biz we must do to keep cat town happy ... or else')
# journe.add_task(None, 'pat shape', 10, 'cat town')
# journe.add_task(None, 'feed catsmall', 231, 'cat town')
# journe.add_task(None, 'REMOVE THIS TASK', 13, 'cat town')
# journe.add_task(None, 'WRONG POT TASK', 13, 'THIS POT ISNT THERE LMAO')
# journe.add_pot(None, 'REMOVE THIS POT', 'nuke this son!')
# journe.add_task(None, 'THIS TASK NEEDS TO BE PLATTER', 313, 'REMOVE THIS POT')
#
# print(journe.read(journe_object_type='pot', read_all=True))
# print(journe.read(journe_object_type='task', read_all=True))
# print(journe.read('task', _title='poopieees'))
# journe.remove('task', _title="REMOVE THIS TASK")
# journe.remove('pot', _title="REMOVE THIS POT")
# print(journe.read(journe_object_type='task', read_all=True))
# print(journe.read(journe_object_type='pot', read_all=True))
# print(journe.pots)
