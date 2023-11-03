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
