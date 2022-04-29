"""Flask configuration variables."""
from os import path

basedir = path.abspath(path.dirname(__file__))


class Config:
    """Database Configuration"""
    SQLALCHEMY_DATABASE_URI = "postgresql://hello202:hello202@hotel-management.cnsjmvtqfyks.us-west-1.rds.amazonaws.com:5432/hotelmanagement"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'
