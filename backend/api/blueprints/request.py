from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
import pprint
pp = pprint.PrettyPrinter(indent=4)

from .. import db
# you might notice I'm not importing sqlalchemy or something similar here
# Ultimately I wanted to keep this simple but an ORM would probably be a consideration otherwise

# define our blueprint
request_bp = Blueprint('request_bp',__name__)

# hacky way of letting me get these records to my frontend without auth
@request_bp.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

# main requests list API endpoint
@request_bp.route('/requests')
@cross_origin()
def get_requests():
    cur = db.get_db().cursor()
    # I'm simply returning all records here but would include a WHERE in a real application
    res = cur.execute("SELECT * FROM request").fetchall()

    # convert our list of tuples to a list of dicts to parse to JSON for the API response
    result_list = [{k: request[k] for k in request.keys()} for request in res]

    # close the db connection and return our json result
    db.close_db()
    return jsonify(result_list)

# API endpoint to add a request
@request_bp.route('/request/add', methods=['POST'])
@cross_origin()
def add_request():
    if request.is_json:
        data = request.get_json()
        
        cur = db.get_db().cursor()
        cur.execute(
            "INSERT INTO request (reason, amount, member_id, trans_date,account_number) VALUES (?,?,?,?,?)", 
            (
                data['reason'],
                data['amount'],
                1,
                data['trans_date'],
                10025102
            )
        )

        db.get_db().commit()
        db.close_db()

        return jsonify(message="Data received successfully"), 200
    else:
        return jsonify(error="Invalid request format"), 400

# For these routes I really should be returning more helpful response data to the API caller, I'm not doing it but at least I know I should?
# I am also hard-coding some values in the /add endpoint because I'm not doing any auth layer anywhere but they would use the logged in user values
# I left pprint in here as evidence of my debugging because I was checking the request.form instead of request.data