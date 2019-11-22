from flask import Blueprint
from flask import request
from .extensions import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

user = Blueprint('user', __name__)


@user.route('/user', methods=['GET'])
@user.route('/user/<id>', methods=['GET'])
@jwt_required
def getUser(id=''):
    if(id != ''):
        return dumps(mongo.db.users.find_one_or_404({'_id': ObjectId(id)}))
    else:
        return dumps(list(mongo.db.users.find({})))
