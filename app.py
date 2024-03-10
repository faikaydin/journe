from src.data.journe_app import *
from common.app_config import DUMMY_DB_JSON_PATH
from flask import Flask, jsonify, request
from flask_cors import CORS

# getting the dataset
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # enable CORS for all routes

journe = Journe()  # create Journe App Instance
journe.reset_db()
journe.load_json(json_payload_path=DUMMY_DB_JSON_PATH)  # setting up our dummy instance :)
journe.update("task", "mno-345-pqr-678")
journe.pots["2l3k4j5i-6h7g8f9e-a1b2c3d4e5f"].pot_title = "Creative Chaos"
journe.update("pot", "2l3k4j5i-6h7g8f9e-a1b2c3d4e5f")


# get endpoints
@app.route('/get_all_journe_data', methods=['GET'])
def get_all_journe_data():
    journe.sync_local_with_db()
    tasks, pots = [e.to_payload() for e in journe.tasks.values()], \
                  [e.to_payload() for e in journe.pots.values()]

    return jsonify(response={'tasks': tasks, 'pots': pots}), 200


@app.route('/get_all_tasks', methods=['GET'])
def get_tasks():
    journe.sync_local_with_db()
    return jsonify(response=journe.read(journe_object_type='task', read_all=True)), 200


@app.route('/get_all_pots', methods=['GET'])
def get_pots():
    journe.sync_local_with_db()
    return jsonify(response=journe.read(journe_object_type='pot', read_all=True)), 200


# create endpoint
@app.route('/create/<string:object_type>', methods=['POST'])
def create(object_type):
    try:
        data = request.get_json()
        if not data:
            print('no json!!!')
            return jsonify({'error': 'invalid json data in request'})  # data payload

        if object_type == 'task':
            journe.add_task(*journe.return_task_list_from_dict(data))
        if object_type == 'pot':
            journe.add_pot(*journe.return_pot_list_from_dict(data))
        return jsonify(response=f'{object_type}  - updated'), 200
    except Exception as e:
        return str(e), 500


# remove endpoint
# object_type values can only be one of -> 'task', 'pot'
@app.route('/remove/<string:object_type>/<string:object_id>', methods=['DELETE'])
def remove(object_type, object_id):
    # Assuming you have a function to delete a task by ID
    journe.remove(journe_object_type=object_type, _id=object_id)
    print(f'{object_type} with ID {object_id} deleted successfully')
    return jsonify(response=f'{object_type}  - updated'), 200


# update endpoint
@app.route('/update/<string:object_type>/<string:object_id>', methods=['POST'])
def update(object_type, object_id):
    try:
        data = request.get_json()  # update information
        if not data:
            print('no json!!!')
            return jsonify({'error': 'invalid json data in request'})
        if object_type == 'task':
            journe.tasks[object_id] = Task(*journe.return_task_list_from_dict(data))  # create a new Task w/ update
        if object_type == 'pot':
            journe.pots[object_id] = Pot(*journe.return_pot_list_from_dict(data))  # create a new Pot w/ update data
        journe.update(object_type, object_id)  # update db
        return jsonify(response=f'{object_type}  - updated'), 200
    except Exception as e:
        return str(e), 500


@app.route('/reset_db', methods=['GET'])
def reset_db():
    journe.reset_db()
    return jsonify(response='db reset'), 200


@app.route('/load_dummy_json', methods=['GET'])
def load_dummy_json():
    journe.load_json(json_payload_path=DUMMY_DB_JSON_PATH)  # setting up our dummy instance :)
    return jsonify(response='dummy json loaded'), 200


# if __name__ == '__main__':
#     app.run(debug=True, port=6969)
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
