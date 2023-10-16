import os
from src import utils

# handling config file
CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'config.yaml')
config = utils.read_config(CONFIG_FILE)
# path variables
DATABASE_PATH = config['database_path']  # where the db will be
JOURNE_CORE_CREATE_PATH = config['data_structure_sql_path']  # sql file to create/nuke db
