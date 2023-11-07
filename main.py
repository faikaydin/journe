from src.data.journe_app import *

journe = Journe()  # create Journe App Instance
journe.reset_db()  # reset db ... nuke!
journe.add_task('poopieees', 24)
journe.add_pot('cat town', 'all cat biz we must do to keep cat town happy ... or else')
journe.add_task('pat shape', 10, 'cat town')
journe.add_task('feed catsmall', 231, 'cat town')
print(journe.read_pots())
print(journe.read_tasks())
