"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for

from .models import User, db, Hotel, Room, Reservation


@app.route("/adduser", methods=["POST"])
def add_user():
    data = request.get_json()
    # uid = data['uid']
    username = data["user"]
    email = data["email"]
    password = data["password"]
    rewards = data["rewards"]

    # check if not empty
    if username and email and password:  # and uid:
        existing_user = User.query.filter(
            User.name == username or User.email == email
        ).first()  # first is used to return the first result or None if result doesn't contain any row
        if existing_user:
            return make_response(f"{username} ({email}) already created!")
        new_user = User(
            # uid=uid,
            name=username,
            email=email,
            password=password,
            rewards=rewards
        )  # Create an instance of the User class
        db.session.add(new_user)  # Adds new User record to database
        db.session.commit()  # Commits all changes

    # have to be deleted later
    # res = User.query.all()
    # for r in res:
    #     print(r.name)
    return "data added"


@app.route("/getusers", methods=["GET"])
def get_users():
    try:
        res = User.query.all()
        user_list = []
        for r in res:
            user_list.append(r.name)
        return make_response(f"Done. Users are {user_list}", 200)

    except:
        return make_response("NOT WORKING", 404)


@app.route("/addhotel", methods=["POST"])
def add_hotel():
    try:
        data = request.get_json()
        hotel_name = data["hotel-name"]
        location = data["location"]
        total_rooms = data["total_rooms"]
        available_rooms = data["available_rooms"]

        # check if not empty
        if hotel_name and location and total_rooms and available_rooms:
            existing_hotel = Hotel.query.filter(
                Hotel.hname == hotel_name or Hotel.location == location
            ).first()  # first is used to return the first result or None if result doesn't contain any row
            if existing_hotel:
                return make_response(f"Hotel Id: {Hotel.hid} ({Hotel.available_rooms}) already created!")
            new_hotel = User(
                hname=hotel_name,
                location=location,
                total_rooms=total_rooms,
                available_rooms=available_rooms
            )  # Create an instance of the Hotel class
            db.session.add(new_hotel)  # Adds new hotel the database
            db.session.commit()  # Commits all changes
        return make_response(f"Done. Hotel has been added", 200)
    except:
        return make_response("An error occurred while adding hotel!", 404)


@app.route("/gethotel", methods=["GET"])
def get_hotels():
    try:
        res = Hotel.query.all()
        hotel_list = []
        for r in res:
            hotel_list.append(r.hname)
        return make_response(f"Done. Hotels are {hotel_list}", 200)
    except:
        return make_response("NOT WORKING", 404)


@app.route("/addroom", methods=["POST"])
def add_room():
    # add a check method that check if the number of type of that room in the particular hotel if it is more than the
    # total_<type> field in hotel table then return error that maximum have been added
    data = request.get_json()
    hid = data["hid"]  # assumed that the admin wil enter this while adding rooms to the db
    hotel = data["hotel_name"]
    type = data["type"]
    baseprice = data["baseprice"]  # has to be specified by the admin

    # check if not empty
    if hid and hotel and type and baseprice:
        new_room = Room(
            hid=hid,
            hotel=hotel,
            type=type,
            baseprice=baseprice
        )  # Create an instance of the Hotel class
        db.session.add(new_room)  # Adds new hotel the database
        db.session.commit()  # Commits all changes
    return "Room added"


@app.route("/addreservation", methods=["POST"])
def add_reservation():
    pass
