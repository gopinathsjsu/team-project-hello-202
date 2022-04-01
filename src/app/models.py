"""Data models."""
from . import db


# class UserExample(db.Model):
#     """Data model for user accounts."""
#
#     __tablename__ = "flasksqlalchemy-tutorial-users"
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(64), index=False, unique=True, nullable=False)
#     email = db.Column(db.String(80), index=True, unique=True, nullable=False)
#     created = db.Column(db.DateTime, index=False, unique=False, nullable=False)
#     bio = db.Column(db.Text, index=False, unique=False, nullable=True)
#     admin = db.Column(db.Boolean, index=False, unique=False, nullable=False)
#
#     def __repr__(self):
#         return "<User {}>".format(self.username)


# User table
class User(db.Model):
    __tablename__ = "user"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=False, nullable=False)
    email = db.Column(db.String(80), index=True, unique=True, nullable=False)
    password = db.Column(db.String(64), index=False, unique=False, nullable=False)
    rewards = db.Column(db.Float, index=False, unique=False, nullable=False, default=0.0)


# Hotel table
class Hotel(db.Model):
    __tablename__ = "hotel"
    hid = db.Column(db.Integer, primary_key=True)
    hname = db.Column(db.String(64), index=False, nullable=False)
    location = db.Column(db.String(80), index=True, unique=True, nullable=False)
    total_rooms = db.Column(db.Integer, index=False, unique=False, nullable=False)
    available_rooms = db.Column(db.Integer, index=False, unique=False, nullable=False, default=0.0)


# Room table
class Room(db.Model):
    __tablename__ = "room"
    rid = db.Column(db.Integer, primary_key=True)
    hid = db.Column(db.Integer, db.ForeignKey('hotel.hid', ondelete='CASCADE'), nullable=False)
    hotel = db.relationship('Hotel', backref=db.backref('rooms'))
    type = db.Column(db.String(80), index=True, nullable=False)
    baseprice = db.Column(db.Float, index=False, nullable=False)


# Reservation table
class Reservation(db.Model):
    __tablename__ = "reservation"
    reserve_id = db.Column(db.Integer, primary_key=True)

    # room id foreign key
    rid = db.Column(db.Integer, db.ForeignKey('room.rid', ondelete='CASCADE'), nullable=False)
    rooms = db.relationship('Room', backref=db.backref('reservation'))

    # user id foreign key
    uid = db.Column(db.Integer, db.ForeignKey('user.uid', ondelete='CASCADE'), nullable=False)
    users = db.relationship('User', backref=db.backref('reservation'))

    # hotel id foreign key
    hid = db.Column(db.Integer, db.ForeignKey('hotel.hid', ondelete='CASCADE'), nullable=False)
    hotels = db.relationship('Hotel', backref=db.backref('reservation'))

    breakfast = db.Column(db.Boolean, nullable=False)
    fitness = db.Column(db.Boolean, nullable=False)
    swimming = db.Column(db.Boolean, nullable=False)
    parking = db.Column(db.Boolean, nullable=False)
    all_meals = db.Column(db.Boolean, nullable=False)
    start = db.Column(db.Date, nullable=False)
    end = db.Column(db.Date, nullable=False)
    price = db.Column(db.float, nullable=False)
    type = db.Column(db.String(30), nullable=False)
    num_people = db.Column(db.Integer, nullable=False)

#### check where to set index = True
