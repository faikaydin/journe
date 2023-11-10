import os
import platform
from src import utils

# getting root directory
ROOT = os.path.dirname(os.path.dirname(__file__))  # One level up-> ../common -> which is root

# checking os because Windows being dumb
if platform.system() == "Windows":
    _, ROOT = os.path.splitdrive(ROOT)  # some stupid windows shit
    root_dir = ROOT.replace("\\", "/")  # some stupid windows shit

# getting config file
CONFIG_FILE = os.path.join(ROOT, 'config.yaml')
config = utils.read_config(CONFIG_FILE)

# path variables
DATABASE_PATH = ROOT + config['database_path']  # where the db will be
JOURNE_CORE_CREATE_SQL_PATH = ROOT + config['data_structure_sql_path']  # sql file to create/nuke db
JOURNE_CORE_TASK_PAYLOAD_SQL_PATH = ROOT + config['task_payload_sql_path']  # sql to insert task payload to db
JOURNE_CORE_POT_PAYLOAD_SQL_PATH = ROOT + config['pot_payload_sql_path']  # sql to insert pot payload to db
JOURNE_CORE_GET_POT_SQL_PATH = ROOT + config['get_pot_sql_path']  # get pot
JOURNE_CORE_GET_TASK_SQL_PATH = ROOT + config['get_task_sql_path']  # get task
JOURNE_CORE_READ_TASKS_SQL_PATH = ROOT + config['read_tasks']  # read all tasks
JOURNE_CORE_READ_POTS_SQL_PATH = ROOT + config['read_pots']  # read all pots
JOURNE_CORE_REMOVE_POT_SQL_PATH = ROOT + config['remove_pot_sql_path']  # remove pot
JOURNE_CORE_REMOVE_TASK_SQL_PATH = ROOT + config['remove_task_sql_path']  # remove task


# holds all send operation sql paths
payload_paths = {
                      'task': {'SEND': JOURNE_CORE_TASK_PAYLOAD_SQL_PATH,
                               'READ': {'ALL': JOURNE_CORE_READ_TASKS_SQL_PATH,
                                        'UNIT': JOURNE_CORE_GET_TASK_SQL_PATH
                                        },
                               'REMOVE': JOURNE_CORE_REMOVE_TASK_SQL_PATH
                               },
                      'pot': {'SEND': JOURNE_CORE_POT_PAYLOAD_SQL_PATH,
                              'READ': {'ALL': JOURNE_CORE_READ_POTS_SQL_PATH,
                                       'UNIT': JOURNE_CORE_GET_POT_SQL_PATH
                                       },
                              'REMOVE': JOURNE_CORE_REMOVE_POT_SQL_PATH
                              }
                     }
