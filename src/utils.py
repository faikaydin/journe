import yaml


# function for reading the yaml config.yaml
def read_config(config_path):
    with open(config_path, 'r') as config_file:
        config = yaml.safe_load(config_file)
    return config


# function to parse sql command
def read_sql_command(file_path):
    with open(file_path, 'r') as sql_file:
        sql_content = sql_file.read()
    return sql_content
