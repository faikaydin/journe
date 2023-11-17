import uuid
from src.utils import log_creation

"""
    a block is a time range that holds one or more tasks! 
"""


class Block:
    def __init__(self, block_id, block_start_time, block_end_time):
        self.journe_object_type = 'block'  # type of object
        if block_id:
            self.block_id = block_id
        else:
            self.block_id = str(uuid.uuid4())  # generate a unique block ID
        self.block_start_time = block_start_time  # start timestamp YYYY-MM-DDTHH:mm:ss
        self.block_end_time = block_end_time  # end timestamp YYYY-MM-DDTHH:mm:ss
        log_creation(self)  # successful creation of object

    def __str__(self):
        return f"block - start time: {self.block_start_time} | end time: {self.block_end_time}"

    # creates a dictionary payload - used to send to dbs and front ends
    def to_payload(self):
        return {
            'block_id': self.block_id,
            'block_start_time': self.block_start_time,
            'block_end_time': self.block_end_time
        }
