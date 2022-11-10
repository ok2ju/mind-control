from os import environ, path

basedir = path.abspath(path.dirname(__file__))

class Config:
    FLASK_DEBUG = environ.get('FLASK_DEBUG')
    FLASK_RUN_PORT = environ.get('FLASK_RUN_PORT')

    SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')

    AUTH0_DOMAIN = environ.get('AUTH0_DOMAIN')
    AUTH0_API_IDENTIFIER = environ.get('AUTH0_API_IDENTIFIER')
    AUTH0_ALGORITHMS = ["RS256"]

    @staticmethod
    def init_app(app):
        pass