"""Initialize Flask app."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()


# patch_all()


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
