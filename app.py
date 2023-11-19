from src.data.journe_app import *
from common.app_config import DUMMY_DB_JSON_PATH
from flask import Flask, jsonify
from flask_cors import CORS
# getting the dataset
app = Flask(__name__)
CORS(app)  # enable CORS for all routes
journe = Journe()  # create Journe App Instance


@app.route('/get_all_journe_data', methods=['GET'])
def get_all_journe_data():
    journe.sync_local_with_db()
    tasks = journe.tasks
    pots = journe.pots
    blocks = journe.blocks
    return jsonify(response={'tasks': tasks, 'pots': pots, 'blocks': blocks})


@app.route('/get_all_tasks', methods=['GET'])
def get_tasks():
    journe.sync_local_with_db()
    return jsonify(response=journe.read(journe_object_type='task', read_all=True))


@app.route('/get_all_pots', methods=['GET'])
def get_pots():
    journe.sync_local_with_db()
    return jsonify(response=journe.read(journe_object_type='pot', read_all=True))


@app.route('/get_all_blocks', methods=['GET'])
def get_blocks():
    journe.sync_local_with_db()
    return jsonify(response=journe.read(journe_object_type='block', read_all=True))


@app.route('/reset_db', methods=['GET'])
def reset_db():
    journe.reset_db()
    return jsonify(response='db reset' )


@app.route('/load_dummy_json', methods=['GET'])
def load_dummy_json():
    journe.load_json(json_payload_path=DUMMY_DB_JSON_PATH)  # setting up our dummy instance :)
    return jsonify(response='dummy json loaded')


@app.route('/add_token_block_test', methods=['GET'])
def add_token_block_test():
    journe.add_block('2023-11-16 15:00:00', '2023-11-16 17:40:00')
    return jsonify(response='added block')


if __name__ == '__main__':
    app.run(debug=True, port=6969)
# journe.reset_db()  # reset db ... nuke!
# journe.sync_local_with_db()  # syncing db with local
# #####################################################
# journe.add_task(None, 'poopieees', 24)
# journe.add_pot(None, 'cat town', 'all cat biz we must do to keep cat town happy ... or else')
# journe.add_task(None, 'pat shape', 10, 'cat town')
# journe.add_task(None, 'feed catsmall', 231, 'cat town')
# journe.add_task(None, 'REMOVE THIS TASK', 13, 'cat town')
# journe.add_task(None, 'WRONG POT TASK', 13, 'THIS POT ISNT THERE LMAO')
# journe.add_pot(None, 'REMOVE THIS POT', 'nuke this son!')
# journe.add_task(None, 'THIS TASK NEEDS TO BE PLATTER', 313, 'REMOVE THIS POT')
#
# print(journe.read(journe_object_type='pot', read_all=True))
# print(journe.read(journe_object_type='task', read_all=True))
# print(journe.read('task', _title='poopieees'))
# journe.remove('task', _title="REMOVE THIS TASK")
# journe.remove('pot', _title="REMOVE THIS POT")
# print(journe.read(journe_object_type='task', read_all=True))
# print(journe.read(journe_object_type='pot', read_all=True))
# print(journe.pots)
