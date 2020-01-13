from flask import Blueprint
from flask import request
from flask import jsonify
from .extensions import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

favoriteConverence = Blueprint('favoriteConverence', __name__)


@favoriteConverence.route('/favoriteConverence', methods=['DELETE'])
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


@favoriteConverence.route('/favoriteConverence', methods=['POST'])
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


@favoriteConverence.route('/favoriteConverence', methods=['GET'])
@jwt_required
def get(id=''):
    userId = request.args.get('userId')
    favoriteConverences = []
    if(userId):
        user = mongo.db.users.find_one_or_404({'_id': ObjectId(userId)})
        if('favoriteConferences' in user):
            favoriteConverences = list(user['favoriteConferences'])

    return dumps(favoriteConverences)
