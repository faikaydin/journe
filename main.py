from src.data.journe_app import *

journe = Journe()  # create Journe App Instance
journe.reset_db()  # reset db ... nuke!
print(journe.read_pots())
print(journe.read_tasks())
journe.add_task('pat cat', 24)
print(journe.read_pots())
print(journe.read_tasks())