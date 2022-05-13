"""Initialize Flask app."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


class DbInstance(object):
    __instance = None
    __db = None

    @staticmethod
    def get_instance():
        if DbInstance.__instance == None:
            DbInstance()
        return DbInstance.__instance

    def __init__(self):
        if DbInstance.__instance != None:
            raise Exception("Db instance exists already!")
        else:
            DbInstance.__instance = self
            DbInstance.__db = SQLAlchemy()

    def get_db(self):
        return DbInstance.__db


def create_app():
    """Construct the core application."""

    app = Flask(__name__, instance_relative_config=False)
    cors = CORS(app)
    # app.config['CORS_HEADERS'] = 'Content-Type'

    # app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")

    db.init_app(app)

    with app.app_context():
        from . import routes  # Import routes

        db.create_all()  # Create database tables for our data models

        return app


dbinstance = DbInstance.get_instance()
db = dbinstance.get_db()
