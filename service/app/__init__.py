import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    Config.init_app(app)
    logging.basicConfig(filename='logs.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
    CORS(app, resources={r'/api/v1/*': {'origins': '*'}})

    db.init_app(app)
    migrate = Migrate(app, db)

    from app.views.errors import error_views
    app.register_blueprint(error_views)

    from app.views.generic import generic_views
    app.register_blueprint(generic_views)

    from app.views.records import records_views
    app.register_blueprint(records_views)

    return app