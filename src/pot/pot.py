import uuid
from src.utils import log_creation

"""
    pot class! Holds a bunch of tasks that should go together!
"""


class Pot:
    def __init__(self, pot_id, pot_title, pot_description):
        self.journe_object_type = 'pot'  # type of object
        if pot_id:
            self.pot_id = pot_id
        else:
            self.pot_id = str(uuid.uuid4())  # generate a unique task ID
        self.pot_title = pot_title
        self.pot_description = pot_description
        log_creation(self)  # successful creation of object

    def __str__(self):
        return f"pot - {self.pot_title} : {self.pot_description}"

    # creates a dictionary payload - used to send to dbs and front ends
    def to_payload(self):
        return {
            'pot_id': self.pot_id,
            'pot_title': self.pot_title,
            'pot_description': self.pot_description
            }

