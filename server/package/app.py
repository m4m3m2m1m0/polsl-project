import sys
from flask import Flask
from Controllers.auth import auth
from Controllers.user import user
from Controllers.conference import conference
from Controllers.news import news
from Controllers.favoriteConverence import favoriteConverence
from Controllers.extensions import mongo, argon2, jwt
from flask_cors import CORS

app = Flask(__name__)


def create_app():
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/polsl-project'
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

    mongo.init_app(app)
    argon2.init_app(app)
    jwt.init_app(app)
    CORS(app)  # This will enable CORS for all routes

    app.register_blueprint(auth)
    app.register_blueprint(user)
    app.register_blueprint(conference)
    app.register_blueprint(news)
    app.register_blueprint(favoriteConverence)

    if __name__ == '__main__':
        app.run(host='127.0.0.1', port=7000)

    sys.path.append('..')
    return app


@app.after_request
def apply_caching(response):
    response.headers['Content-Type'] = 'application/json'
    return response


create_app()
