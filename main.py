from src.data.journe_app import *

journe = Journe()  # create Journe App Instance
journe.reset_db()  # reset db ... nuke!
print(journe.read_pots_from_db())
print(journe.read_tasks_from_db())
journe.add_task('pat cat', 24)
print(journe.read_pots_from_db())
print(journe.read_tasks_from_db())