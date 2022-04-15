"""Data models."""
from . import db


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
    hname = db.Column(db.String(64), index=False, nullable=False, unique=True)
    location = db.Column(db.String(80), index=True, unique=True, nullable=False)
    total_single = db.Column(db.Integer, index=False, unique=False, nullable=False)
    total_double = db.Column(db.Integer, index=False, unique=False, nullable=False)
    total_suite = db.Column(db.Integer, index=False, unique=False, nullable=False)

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
    reserve_id = db.Column(db.Integer, primary_key=True, index=True)

    # room id foreign key
    rid = db.Column(db.Integer, db.ForeignKey('room.rid', ondelete='CASCADE'), index=True, nullable=False)
    rooms = db.relationship('Room', backref=db.backref('reservation'))

    # user id foreign key
    uid = db.Column(db.Integer, db.ForeignKey('user.uid', ondelete='CASCADE'), index=True, nullable=False)
    users = db.relationship('User', backref=db.backref('reservation'))

    # hotel id foreign key
    hid = db.Column(db.Integer, db.ForeignKey('hotel.hid', ondelete='CASCADE'), index=True, nullable=False)
    hotel = db.relationship('Hotel', backref=db.backref('reservation'))

    breakfast = db.Column(db.Boolean, index=False, nullable=False)
    fitness = db.Column(db.Boolean, index=False, nullable=False)
    swimming = db.Column(db.Boolean, index=False, nullable=False)
    parking = db.Column(db.Boolean, index=False, nullable=False)
    all_meals = db.Column(db.Boolean, index=False, nullable=False)
    start = db.Column(db.Date, nullable=False, index=True)
    end = db.Column(db.Date, nullable=False, index=True)
    price = db.Column(db.FLOAT, nullable=False)
    # type = db.Column(db.String(30), nullable=False, index=True)
    num_people = db.Column(db.Integer, nullable=False)
