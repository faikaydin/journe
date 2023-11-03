from src.task import Task
from src.data.journe_core import *

# create the core-db
journe = JourneConnection()
journe.create_new_journe_core()
task = Task('pat cat', 15)
journe.task_payload_to_core(task)
