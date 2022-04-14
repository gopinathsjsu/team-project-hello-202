"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for
from collections import defaultdict
from .models import User, db, Hotel, Room, Reservation


@app.route("/user", methods=["POST", "GET"])
def user():
    try:
        if request.method == "POST":
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
                return make_response("User added!", 200)
    except:
        return make_response("Oops! An error occurred", 404)

    if request.method == "GET":
        try:
            res = User.query.all()
            user_list = []
            for r in res:
                user_list.append(r.name)
            return make_response(f"Done. Users are {user_list}", 200)

        except:
            return make_response("Oops! An error occurred", 404)


@app.route("/hotel", methods=["GET", "POST"])
def hotel():
    if request.method == "POST":
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
    if request.method == "GET":
        try:
            res = Hotel.query.all()
            hotel_list = []
            for r in res:
                hotel_list.append(r.hname)
            return make_response(f"Done. Hotels are {hotel_list}", 200)
        except:
            return make_response("NOT WORKING", 404)


@app.route("/room", methods=["GET", "POST"])
def room():
    if request.method == "POST":
        try:
            data = request.get_json()
            hid = data["hid"]  # assumed that the admin wil enter this while adding rooms to the db
            hotel_name = data["hotel_name"]
            type = data["type"]
            baseprice = data["baseprice"]  # has to be specified by the admin

            # checking if the type of that room in the particular hotel is more
            # than the total_<type> field in hotel table. If so, return error that maximum have been added
            rooms_added_already = Room.query.filter(Room.hotel == hotel_name,
                                                    Room.type == type)
            hotelroom_type = f"total_{type}"
            maxm_limit = Hotel.query.filter(Hotel.hname == hotel_name, Hotel.type == hotelroom_type)
            if len(rooms_added_already) >= maxm_limit:
                return make_response(f"Maximum limit reached for this room hotel in hotel {hotel_name}", 405)

            # check if not empty
            if hid and hotel_name and type and baseprice:
                new_room = Room(
                    hid=hid,
                    hotel=hotel_name,
                    type=type,
                    baseprice=baseprice
                )  # Create an instance of the Hotel class
                db.session.add(new_room)  # Adds new hotel the database
                db.session.commit()  # Commits all changes
            return make_response(f"Done. Room has been added", 200)
        except:
            return make_response("An error occurred while trying to add room!", 404)
    if request.method == "GET":
        try:
            # data will be sent in the url string
            args = request.args
            args.to_dict()
            hotelname = args.get("hotel_name")
            roomtype = args.get("room_type")
            if roomtype == "all":
                rooms = Room.query.filter(
                    Room.hotel == hotelname
                )
            else:
                rooms = Room.query.filter(
                    Room.hotel == hotelname or Room.type == roomtype
                )
            room_data = defaultdict(list)
            for room in rooms:
                room_data[room.hotel].append({"type": room.type, "baseprice": room.baseprice, "rid": room.rid})
            return make_response(room_data, 200)
        except:
            return make_response("NOT WORKING", 404)


@app.route("/reservation", methods=["GET", "POST"])
def reservation():
    if request.method == "POST":
        try:
            pass
        except:
            pass

    if request.method == "GET":
        try:
            pass
        except:
            pass
