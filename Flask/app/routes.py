"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for
from collections import defaultdict
from .models import User, db, Hotel, Room, Reservation
from flask_cors import cross_origin


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    try:
        data = request.get_json()
        email = data['email']
        pwd = data['password']
        if email and pwd:
            pass
        user = User.query.filter(
            User.email == email, User.password == pwd
        ).first()

        return make_response(f"{user.uid}", 200)
    except:
        return make_response("Make sure the username and password are correct.", 404)


@app.route("/user", methods=["POST", "GET"])
@cross_origin()
def user():
    try:
        if request.method == "POST":
            data = request.get_json()
            # uid = data['uid']
            name = data["name"]
            email = data["email"]
            password = data["password"]
            # rewards = data["rewards"]
            # check if not empty
            if name and email and password:  # and uid:
                existing_user = User.query.filter(
                    User.email == email
                ).first()  # first is used to return the first result or None if result doesn't contain any row
                if existing_user:
                    return make_response(f"{name} ({email}) already created!")

                new_user = User(
                    # uid=uid,
                    name=name,
                    email=email,
                    password=password
                    # rewards=rewards
                )  # Create an instance of the User class
                db.session.add(new_user)  # Adds new User record to database
                db.session.commit()  # Commits all changes
                user = User.query.filter(User.email == email).first()
                return make_response(f"{user.uid}", 200)
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
@cross_origin()
def hotel():
    if request.method == "POST":
        try:
            data = request.get_json()
            hotel_name = data["hotel-name"]
            location = data["location"]
            total_single = data["total_single"]
            total_double = data["total_double"]
            total_suite = data["total_suite"]

            # check if not empty
            if hotel_name and location and total_single and total_double and total_suite:
                existing_hotel = Hotel.query.filter(
                    Hotel.hname == hotel_name or Hotel.location == location
                ).first()  # first is used to return the first result or None if result doesn't contain any row
                if existing_hotel:
                    return make_response(f"Hotel Id: {Hotel.hid} ({Hotel.available_rooms}) already created!")
                new_hotel = Hotel(
                    hname=hotel_name,
                    location=location,
                    total_single=total_single,
                    total_double=total_double,
                    total_suite=total_suite
                )  # Create an instance of the Hotel class
                db.session.add(new_hotel)  # Adds new hotel the database
                db.session.commit()  # Commits all changes

            return make_response(f"Done. Hotel has been added", 200)
        except:
            return make_response("An error occurred while adding hotel!", 404)
    if request.method == "GET":
        try:
            hotels = Hotel.query.all()
            hotel_collection = defaultdict(dict)
            for hotel in hotels:
                hotel_collection[hotel.hname] = {
                    "id": hotel.hid,
                    "location": hotel.location
                }

            return make_response(hotel_collection, 200)
        except:
            return make_response("NOT WORKING", 404)


@app.route("/room", methods=["GET", "POST"])
@cross_origin()
def room():
    if request.method == "POST":
        try:
            data = request.get_json()
            hotel = Hotel.query.filter(Hotel.hname == data['hname'])
            hid = hotel.hname  # assumed that the admin wil enter this while adding rooms to the db

            type = data["type"]
            baseprice = data["baseprice"]  # has to be specified by the admin
            # checking if the type of that room in the particular hotel is more
            # than the total_<type> field in hotel table. If so, return error that maximum have been added
            rooms_added_already = Room.query.filter(Room.hid == hid,
                                                    Room.type == type).all()
            # hotelroom_type = f"total_{type}"
            maxm_limit = Hotel.query.filter(Hotel.hid == hid).first()
            if type == "single":
                maxm_limit = maxm_limit.total_single
            if type == "double":
                maxm_limit = maxm_limit.total_double
            if type == "suite":
                maxm_limit = maxm_limit.total_suite

            if rooms_added_already is not None or len(rooms_added_already) >= maxm_limit:
                return make_response(f"Maximum limit reached for this room type in hotel {hid}", 405)
            # check if not empty
            if hid and type and baseprice:
                new_room = Room(
                    hid=hid,
                    type=type,
                    baseprice=baseprice
                )  # Create an instance of the Hotel class
                db.session.add(new_room)  # Adds new hotel the database
                db.session.commit()  # Commits all changes
            return make_response(f"Room has been added", 200)
        except:
            return make_response("An error occurred while trying to add room!", 404)
    if request.method == "GET":
        try:
            # data will be sent in the url string
            args = request.args
            args.to_dict()
            hotelname = args.get("hotel_name")
            roomtype = args.get("room_type")
            hotel_name = Hotel.query.filter(Hotel.hname == hotelname).first()
            if roomtype == "all":
                rooms = Room.query.filter(
                    Room.hid == hotel_name.hid
                )
            else:
                rooms = Room.query.filter(
                    Room.hid == hotel_name.hid, Room.type == roomtype
                )

            room_data = defaultdict(dict)
            for room in rooms:
                hotel = Hotel.query.filter(Hotel.hid == room.hid)
                room_data[hotel.hname] = {"type": room.type, "baseprice": room.baseprice, "rid": room.rid}
            return make_response(f"{room_data}", 200)
        except:
            return make_response("NOT WORKING", 404)


@app.route("/availability", methods=["POST"])
@cross_origin()
def check_availability():
    try:
        data = request.get_json()
        roomType = data['roomType']
        location = data["destination"]
        booking_start = data['checkInDate']
        booking_end = data['checkOutDate']

        hotel = Hotel.query.filter(Hotel.location == f"{location}").all()
        ids = []
        for h in hotel:
            ids.append(h.hid)

        reservation_dates_between = Reservation.query.filter(
            Reservation.start.between(f'{booking_start}', f'{booking_end}') |
            Reservation.end.between(f'{booking_start}', f'{booking_end}')
        ).all()
        exclude_ids = []
        for r in reservation_dates_between:
            exclude_ids.append(r.hid)
        # print("just before query")
        res = db.session.query(Room).join(Reservation, Reservation.rid == Room.rid, isouter=True).filter(
            (Reservation.rid == None) | ((Room.type == f"{roomType}") &
                                         Room.hid.in_(ids) & Room.hid.not_in(exclude_ids))
        ).all()
        # print("just after query")
        return_dict = defaultdict(dict)
        # print(res[0].hid)

        for r in res:
            hotel = Hotel.query.filter(Hotel.hid == r.hid).first()
            return_dict[r.hid] = {"id": r.hid, "name": hotel.hname,
                                  "address": hotel.location,
                                  "rate": r.baseprice}

        return make_response(return_dict, 200)
    except:
        return make_response("Failed request!", 404)


@app.route("/reservation", methods=["GET", "POST"])
@cross_origin()
def reservation():
    if request.method == "POST":
        try:
            # rid, uid, hname, breakfast ...
            data = request.get_json()
            rid = data['rid']
            uid = data['uid']
            hotelname = data["hname"]
            hotelname = Hotel.query.filter(Hotel.hname == hotelname).first()
            hid = hotelname.hid

            # breakfast = data["breakfast"]
            # fitness = data["fitness"]
            # swimming = data["swimming"]
            # parking = data["parking"]
            # all_meals = data["all_meals"]
            start = data["start"]
            end = data["end"]
            price = data["price"]
            num_people = data["num_people"]
            print(start, end)
            new_reservation = Reservation(
                rid=int(rid),
                uid=int(uid),
                hid=int(hid),
                # breakfast=bool(breakfast),
                # fitness=bool(fitness),
                # swimming=bool(swimming),
                # parking=bool(parking),
                # all_meals=bool(all_meals),
                start=start,
                end=end,
                price=float(price),
                num_people=int(num_people)
            )  # Create an instance of the Hotel class
            print("data added")
            db.session.add(new_reservation)  # Adds new hotel the database
            db.session.commit()
            return make_response("Booking Successful", 200)
        except:
            return make_response("Booking Failed", 404)

    if request.method == "GET":
        try:
            reservations = Reservation.query.filter().all()
            all_reservations = {}
            for r in reservations:
                all_reservations["start"] = r.start
                all_reservations["end"] = r.end

            return make_response(f"{all_reservations}", 200)
        except:
            return make_response("Not working", 404)
