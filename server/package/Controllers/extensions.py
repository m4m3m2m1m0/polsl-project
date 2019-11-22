from flask_pymongo import PyMongo
from flask_argon2 import Argon2
from flask_jwt_extended import JWTManager

mongo = PyMongo()
argon2 = Argon2()
jwt = JWTManager()
