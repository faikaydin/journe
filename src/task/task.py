import uuid
from src.utils import log_creation

"""
    a task is the smallest unit of work in journe!
"""


class InvalidTaskDurationError(Exception):
    pass


class Task:
    def __init__(self, task_title, task_duration, task_pot):
        self.task_id = str(uuid.uuid4())  # generate a unique task ID
        self.task_pot_id = str(task_pot)  # link to pot
        self.task_title = str(task_title)  # title of the task that is being created
        try:
            self.task_duration = int(task_duration)  # an estimate of how long a task will take to complete
        except ValueError:
            raise InvalidTaskDurationError("Task duration must be an int value - representing minutes")
        log_creation(self)  # successful creation of object

    def __str__(self):
        return f"task - {self.task_title}"

    # creates a dictionary payload - used to send to dbs and front ends
    def to_payload(self):
        return {
            'task_id': self.task_id,
            'task_pot_id': self.task_pot_id,
            'task_title': self.task_title,
            'task_duration': self.task_duration
            }
