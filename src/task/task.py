import uuid
from src.utils import log_creation

"""
    a task is the smallest unit of work in journe!
"""


class InvalidTaskDurationError(Exception):
    pass


class Task:
    def __init__(self, task_id, task_title, task_duration, task_pot, task_block, task_description):
        self.journe_object_type = 'task'  # type of object
        if task_id:
            self.task_id = task_id
        else:
            self.task_id = str(uuid.uuid4())  # generate a unique task ID
        self.task_pot_id = str(task_pot)  # link to pot
        self.task_block_id = str(task_block)  # link to block
        self.task_title = str(task_title)  # title of the task that is being created
        self.task_description = str(task_description)  # short description of the task
        try:
            self.task_duration = int(task_duration)  # an estimate of how long a task will take to complete
        except ValueError:
            raise InvalidTaskDurationError("Task duration must be an int value - representing minutes")
        log_creation(self)  # successful creation of object

    def __str__(self):
        return f"task - {self.task_title} : {self.task_description} :" \
               f" duration {self.task_duration} min : pot {self.task_pot_id}"

    # creates a dictionary payload - used to send to dbs and front ends
    def to_payload(self):
        return {
            'task_id': self.task_id,
            'task_pot_id': self.task_pot_id,
            'task_title': self.task_title,
            'task_duration': self.task_duration,
            'task_description': self.task_description,
            'task_block_id': self.task_block_id
            }
