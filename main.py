from src.data.journe_app import *

journe = Journe()  # create Journe App Instance
journe.reset_db()  # reset db ... nuke!
journe.add_task('poopieees', 24)
journe.add_pot('cat town', 'all cat biz we must do to keep cat town happy ... or else')
journe.add_task('pat shape', 10, 'cat town')
journe.add_task('feed catsmall', 231, 'cat town')
journe.add_task('REMOVE THIS TASK', 13, 'cat town')
journe.add_pot('REMOVE THIS POT', 'nuke this son!')

print(journe.read(journe_object_type='pot', read_all=True))
print(journe.read(journe_object_type='task', read_all=True))
print(journe.read('task', _title='poopieees'))
journe.remove('task', _title="REMOVE THIS TASK")
journe.remove('pot', _title="REMOVE THIS POT")
print(journe.read(journe_object_type='task', read_all=True))
print(journe.read(journe_object_type='pot', read_all=True))
print(journe.pots)
