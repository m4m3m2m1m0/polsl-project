from flask import Blueprint
from flask import request
from flask import jsonify
from .extensions import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

news = Blueprint('news', __name__)


@news.route('/news', methods=['DELETE'])
@jwt_required
def deleteNews():
    news = request.get_json()
    res = mongo.db.news.delete_one({'_id': ObjectId(news['id'])})
    return jsonify(success=True)


@news.route('/news', methods=['POST'])
@jwt_required
def saveNews():
    news = request.get_json()
    mongo.db.news.insert(news)
    return dumps(news)


@news.route('/news', methods=['GET'])
@news.route('/news/<id>', methods=['GET'])
@jwt_required
def getNews(id=''):
    count = request.args.get('count')
    if(id != ''):
        return dumps(mongo.db.news.find_one_or_404({'_id': ObjectId(id)}))
    else:
        newses = list(mongo.db.news.find({}))
        newses.reverse()
        intCount = len(newses)

        if(count):
            intCount = int(count)

        return dumps(newses[:intCount])
