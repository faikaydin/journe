import os
from src import utils

# handling config file
CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'config.yaml')
config = utils.read_config(CONFIG_FILE)
# path variables
DATABASE_PATH = config['database_path']
