import sys
from flask import Flask
from Controllers.auth import auth
from Controllers.user import user
from Controllers.extensions import mongo, argon2, jwt

app = Flask(__name__)


def create_app():
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/polsl-project'
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

    mongo.init_app(app)
    argon2.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(user)

    if __name__ == '__main__':
        app.run(host='127.0.0.1', port=7000)

    sys.path.append('..')
    return app


@app.after_request
def apply_caching(response):
    response.headers['Content-Type'] = 'application/json'
    return response


create_app()
