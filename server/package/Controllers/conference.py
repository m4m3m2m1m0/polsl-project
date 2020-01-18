from flask import Blueprint
from flask import request
from flask import jsonify
from .extensions import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

conference = Blueprint('conference', __name__)


@conference.route('/conference', methods=['DELETE'])
@jwt_required
def deleteConference():
    conf = request.get_json()
    res = mongo.db.conference.delete_one({'_id': ObjectId(conf['_id']['$oid'])})
    return jsonify(success=True)


@conference.route('/conference', methods=['POST'])
@jwt_required
def saveConference():
    conf = request.get_json()
    mongo.db.conference.insert(conf)
    return dumps(conf)


@conference.route('/conference', methods=['GET'])
@conference.route('/conference/<id>', methods=['GET'])
@jwt_required
def getConference(id=''):
    userId = request.args.get('userId')
    if(id != ''):
        return dumps(mongo.db.conference.find_one_or_404({'_id': ObjectId(id)}))
    elif(userId):
        return dumps(list(mongo.db.conference.find({'userId': userId})))
    else:
        return dumps(list(mongo.db.conference.find({})))
