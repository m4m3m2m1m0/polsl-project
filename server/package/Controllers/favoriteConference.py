from flask import Blueprint
from flask import request
from flask import jsonify
from .extensions import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

favoriteConference = Blueprint('favoriteConference', __name__)


@favoriteConference.route('/favoriteConference', methods=['DELETE'])
@jwt_required
def delete():
    body = request.get_json()
    mongo.db.users.update(
        {
            '_id': ObjectId(body['userId'])
        },
        {
            '$pull': {'favoriteConferences': ObjectId(body['conferenceId'])}
        })

    return jsonify(success=True)


@favoriteConference.route('/favoriteConference', methods=['POST'])
@jwt_required
def save():
    body = request.get_json()
    mongo.db.users.update(
        {
            '_id': ObjectId(body['userId'])
        },
        {
            '$addToSet': {'favoriteConferences': ObjectId(body['conferenceId'])}
        })

    return jsonify(success=True)


@favoriteConference.route('/favoriteConference', methods=['GET'])
@jwt_required
def get(id=''):
    userId = request.args.get('userId')
    favoriteConferences = []
    if(userId):
        user = mongo.db.users.find_one_or_404({'_id': ObjectId(userId)})
        if('favoriteConferences' in user):
            fcIds = list(user['favoriteConferences'])
            favoriteConferences = list(
                mongo.db.conference.find({'_id': {'$in': fcIds}}))

    return dumps(favoriteConferences)
