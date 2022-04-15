"""Flask configuration variables."""
from os import environ, path

# from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))


# load_dotenv(path.join(basedir, ".env"))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    # SECRET_KEY = environ.get("SECRET_KEY")
    # FLASK_APP = environ.get("FLASK_APP")
    # FLASK_ENV = environ.get("FLASK_ENV")

    # Database
    # SQLALCHEMY_DATABASE_URI = "postgresql://username:password@hostname:port/databasename"
    SQLALCHEMY_DATABASE_URI = "postgresql://hello202:hello202@hotel-management.cnsjmvtqfyks.us-west-1.rds.amazonaws.com:5432/hotelmanagement"
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'
