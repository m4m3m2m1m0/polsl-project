from flask import Blueprint
from flask import request
from .extensions import mongo, argon2
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from bson.json_util import dumps
from bson.objectid import ObjectId

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    userInDb = mongo.db.users.find_one({'userName': user['userName']})

    user['password'] = argon2.generate_password_hash(user['password'])
    mongo.db.users.insert(user)
    del user['password']
    return dumps(user)


@auth.route('/login', methods=['POST'])
def login():
    loginInfo = request.get_json()
    user = mongo.db.users.find_one_or_404({'userName': loginInfo['userName']})

    if(argon2.check_password_hash(user['password'], loginInfo['password'])):
        access_token = create_access_token(identity=user['userName'])
        refresh_token = create_refresh_token(identity=user['userName'])

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'tokenType': 'Bearer'
        }


@auth.route('/resetPassword', methods=['GET'])
def resetPassword():
    return 'reset password'
