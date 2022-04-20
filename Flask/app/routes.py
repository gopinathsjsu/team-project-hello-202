"""Application routes."""
from flask import current_app as app
from flask import make_response, request
from collections import defaultdict
from .models import User, db, Hotel, Room, Reservation
from flask_cors import cross_origin
import json


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
        if user.email == "admin@gmail.com":
            resp = {"isAdmin": True, "userID": user.uid}
            json_resp = json.dumps(resp, separators=(',', ':'))
            return make_response(json_resp, 200)
        resp = {"isAdmin": False, "userID": user.uid}
        json_resp = json.dumps(resp, separators=(',', ':'))
        return make_response(json_resp, 200)
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
            hotel_name = data["hname"]
            location = data["location"]
            total_single = int(data["total_single"])
            total_double = int(data["total_double"])
            total_suite = int(data["total_suite"])

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
                    "location": hotel.location,
                    "single rooms": hotel.total_single
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
            hid = hotel.hname

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
        res = Room.query.all()
        return_dict = {}
        for r in res:
            return_dict[r.rid] = {"hid": r.hid, "type": r.type, "price": r.baseprice}
        return make_response("Done", 200)


def dynamic_pricing(price, checkInDate):
    # decrease price
    if int(checkInDate.split("-")[1]) in [2, 3, 4, 5, 9, 10]:
        return price - 0.10 * price
    # increase price
    elif int(checkInDate.split("-")[1]) in [6, 7, 12]:
        return price + 0.20 * price
    else:
        return price


@app.route("/availability", methods=["POST"])
@cross_origin()
def check_availability():
    try:
        data = request.get_json()
        roomType = data['roomType']
        location = data["destination"]
        booking_start = data['checkInDate']
        booking_end = data['checkOutDate']
        num_rooms = int(data['roomCount'])
        if roomType and location and booking_end and booking_start and num_rooms:
            # res = availability_helper(roomType, location, booking_start, booking_end, num_rooms)

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
                exclude_ids.append(r.rid)

            res = db.session.query(Room).join(Reservation, Reservation.rid == Room.rid, isouter=True).filter(
                ((Reservation.rid == None) | (Room.type == f"{roomType}")) &
                Room.hid.in_(ids) & Room.rid.not_in(exclude_ids)
            ).all()  # this gives us all the available rooms amongst all the hotels at a particular location
            # that fits the criteria

            count_rooms_in_hotel = defaultdict(int)  # TO CHECK IF A HOTEL HAS MINIMUM ROOMS
            return_dict = defaultdict(dict)  # ADD HOTELS WHICH HAVE THRESHOLD ROOM VALUE
            if len(res) < num_rooms:  # if not enough rooms available
                return make_response(f"Only {len(res)} rooms available", 404)  # check what response is required
            else:
                counter = 1
                for r in res:
                    count_rooms_in_hotel[r.hid] += 1
                    if count_rooms_in_hotel[r.hid] >= num_rooms:  # if enough rooms available in a hotel
                        hotel = Hotel.query.filter(Hotel.hid == r.hid).first()
                        return_dict[r.hid] = {"idx": counter, "id": r.hid, "name": hotel.hname,
                                              "address": hotel.location,
                                              "rate": dynamic_pricing(r.baseprice, booking_start)}
                        counter += 1
                # if not enough rooms available
                if len(return_dict) == 0:
                    return make_response(f"Not enough rooms available", 404)

                return make_response(return_dict, 200)

        return make_response("Details not correct!", 404)
    except:
        return make_response("Failed request!", 404)


def get_room_ids(roomType, start, end, hotelID):
    # get all the rooms for a hotelID where reservation within target dates
    reservation_dates_between = Reservation.query.filter(
        (Reservation.start.between(f'{start}', f'{end}') |
         Reservation.end.between(f'{start}', f'{end}')) & (Reservation.hid == hotelID)
    ).all()
    exclude_ids = []
    for r in reservation_dates_between:
        exclude_ids.append(r.rid)
    res = Room.query.filter(Room.hid == hotelID, Room.rid.not_in(exclude_ids), Room.type == f"{roomType}").all()
    rids = []
    for r in res:
        rids.append(r.rid)
    return rids


@app.route("/reservation", methods=["GET", "POST", "DELETE", "PUT"])
@cross_origin()
def reservation():
    if request.method == "POST":
        try:
            data = request.get_json()
            uid = data['userID']
            hid = data['hotelID']
            booking_start = data["checkInDate"]
            booking_end = data["checkOutDate"]
            price = data["price"]
            num_people = data["numPeople"]
            num_rooms = data["numRooms"]
            roomType = data["roomType"]
            room_ids = get_room_ids(roomType, booking_start, booking_end, hid)

            for room_id in room_ids[:num_rooms]:
                new_reservation = Reservation(
                    rid=int(room_id),
                    uid=int(uid),
                    hid=int(hid),
                    start=booking_start,
                    end=booking_end,
                    price=float(price),
                    num_people=int(num_people),
                    num_rooms=int(num_rooms)
                )  # Create an instance of the Hotel class
                db.session.add(new_reservation)  # Adds new hotel the database
                db.session.commit()
            return make_response("Booking Successful", 200)
        except:
            return make_response("Booking Failed", 404)

    if request.method == "GET":
        try:
            data = request.get_json()
            uid = data['userID']
            if uid == "all":
                res = Reservation.query.all()
            else:
                res = Reservation.query.filter(Reservation.uid == uid).all()
            res_dict = defaultdict(dict)
            counter = 1
            for r in res:
                res_dict[counter] = {
                    "idx": counter,
                    "reservation_id": r.reserve_id,
                    "rid": r.rid,
                    "hid": r.hid,
                    "start": r.start,
                    "end": r.end,
                    "price": r.price,
                    "num_rooms": r.num_rooms,
                    "num_people": r.num_people
                }
                counter += 1

            return make_response(res_dict, 200)
        except:
            return make_response("Oops, an error occurred!", 404)

    if request.method == "DELETE":
        try:
            data = request.get_json()
            reservation_id = data["reservationID"]
            Reservation.query.filter(Reservation.reserve_id == reservation_id).delete()
            db.session.commit()
            return make_response("Deleted Successfully!", 200)
        except:
            return make_response("Oops, an error occurred!", 404)

    if request.method == "PUT":
        try:
            data = request.get_json()
            reservation_id = data["reservationID"]
            rid = data["roomID"]
            hid = data['hotelID']
            booking_start = data["checkInDate"]
            booking_end = data["checkOutDate"]
            price = data["price"]
            num_people = data["numPeople"]
            num_rooms = data["numRooms"]

            Reservation.query.filter(Reservation.reserve_id == reservation_id).update(
                {"hid": hid,
                 "start": booking_start,
                 "end": booking_end,
                 "price": price,
                 "num_people": num_people,
                 "num_rooms": num_rooms,
                 "rid": rid}
            )

            # commit the change
            db.session.commit()

            return make_response("Updated!", 200)

        except:
            return make_response("Oops, an error occurred!", 404)
