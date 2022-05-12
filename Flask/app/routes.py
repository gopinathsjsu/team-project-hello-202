"""Application routes."""
from flask import current_app as app
from flask import make_response, request
from collections import defaultdict
from .models import User, db, Hotel, Room, Reservation
from flask_cors import cross_origin
import json
import datetime


# for elastic beanstalk health check
@app.route("/", methods=["GET"])
@cross_origin()
def health_check():
    return make_response("ok", 200)


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
            account_date = data["accountDate"]
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
                    password=password,
                    accountDate=account_date
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
            uid = []
            for r in res:
                user_list.append([r.name, r.uid, r.accountDate])
            return make_response(f"Done. Users are {user_list}", 200)

        except:
            return make_response("Oops! An error occurred", 404)


@app.route("/hotel", methods=["GET", "POST", "DELETE"])
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
                    "single rooms": hotel.total_single,
                    "double": hotel.total_double,
                    "suite": hotel.total_suite
                }

            return make_response(hotel_collection, 200)
        except:
            return make_response("NOT WORKING", 404)

    if request.method == "DELETE":
        try:
            data = request.get_json()
            hotel_id = data["hotelID"]
            Hotel.query.filter(Hotel.hid == hotel_id).delete()
            db.session.commit()
            return make_response("Deleted Successfully!", 200)
        except:
            return make_response("Oops, an error occurred!", 404)


@app.route("/room", methods=["GET", "POST"])
@cross_origin()
def room():
    if request.method == "POST":
        try:
            data = request.get_json()
            hotel = Hotel.query.filter(Hotel.hname == data['hname']).first()
            hid = hotel.hid
            type = data["type"]
            baseprice = data["baseprice"]  # has to be specified by the admin

            # checking if the type of that room in the particular hotel is more
            # than the total_<type> field in hotel table. If so, return error that maximum have been added
            rooms_added_already = Room.query.filter(Room.hid == hid,
                                                    Room.type == type).all()

            # hotelroom_type = f"total_{type}"
            # HOTEL = Hotel.query.filter(Hotel.hid == hid).first()
            if type == "single":
                maxm_limit = hotel.total_single
            if type == "double":
                maxm_limit = hotel.total_double
            if type == "suite":
                maxm_limit = hotel.total_suite

            if rooms_added_already is not None and len(rooms_added_already) >= maxm_limit:
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
        hid = request.args.get('hid')
        res = Room.query.filter(Room.hid == hid).all()
        return_dict = {}
        for r in res:
            return_dict[r.rid] = {"hid": r.hid, "type": r.type, "price": r.baseprice}
        return make_response(return_dict, 200)


def get_price(price, checkInDate):
    # monday -> 0 to sunday -> 6
    dp = 0
    checkIn = datetime.datetime.strptime(checkInDate, "%Y-%m-%dT%H:%M:%S.%fZ")
    day = checkIn.weekday()
    if day >= 5:
        dp += 20
    # decrease price
    if int(checkInDate.split("-")[1]) in [2, 3, 4, 5, 9, 10]:
        return dp + (price - 0.10 * price)
    # increase price
    elif int(checkInDate.split("-")[1]) in [6, 7, 12]:
        return dp + (price + 0.20 * price)
    else:
        return dp + price


@app.route("/availability", methods=["POST"])
@cross_origin()
def check_availability():
    try:
        data = request.get_json()
        roomType = data['roomType']  # single, double, suite, all
        location = data["destination"]
        booking_start = data['checkInDate']
        booking_end = data['checkOutDate']
        num_rooms = int(data['roomCount'])

        # booking_start = datetime.datetime.strptime(booking_start, "%Y-%m-%dT%H:%M:%S.%fZ")
        # booking_end = datetime.datetime.strptime(booking_end, "%Y-%m-%dT%H:%M:%S.%fZ")

        if roomType and location and booking_end and booking_start and num_rooms:
            # res = availability_helper(roomType, location, booking_start, booking_end, num_rooms)

            hotel = Hotel.query.filter(Hotel.location == f"{location}").all()
            ids = []
            for h in hotel:
                ids.append(h.hid)

            reservation_dates_start = Reservation.query.filter(
                Reservation.start > booking_start , Reservation.start < booking_end
            ).all()
            exclude_ids = []
            for r in reservation_dates_start:
                exclude_ids.append(r.rid)
            reservation_dates_end = Reservation.query.filter(
                Reservation.start > booking_start, Reservation.start < booking_end
            ).all()
            for r in reservation_dates_end:
                exclude_ids.append(r.rid)

            if roomType == "all":
                res = db.session.query(Room).join(Reservation, Reservation.rid == Room.rid, isouter=True).filter(
                    Room.hid.in_(ids) & Room.rid.not_in(exclude_ids)
                ).all()  # this gives us all the available rooms amongst all the hotels at a particular location

            else:
                res = db.session.query(Room).join(Reservation, Reservation.rid == Room.rid, isouter=True).filter(
                    (Room.type == f"{roomType}") &
                    Room.hid.in_(ids) & Room.rid.not_in(exclude_ids)
                ).all()  # this gives us all the available rooms OF A PARTICULAR TYPE amongst all
                # the hotels at a particular location

            # that fits the criteria

            count_rooms_in_hotel = defaultdict(lambda: defaultdict(int))  # TO CHECK IF A HOTEL HAS MINIMUM ROOMS
            return_dict = defaultdict(lambda: defaultdict(dict))  # ADD HOTELS WHICH HAVE THRESHOLD ROOM VALUE
            if len(res) < num_rooms:  # if not enough rooms available
                return make_response(f"Only {len(res)} rooms available", 404)  # check what response is required
            else:
                counter = 1
                for r in res:
                    count_rooms_in_hotel[r.hid][r.type] += 1

                if roomType == "all":
                    roomType = ["single", "double", "suite"]
                else:
                    roomType = [roomType]
                for hotel_id in count_rooms_in_hotel:
                    for rtype in roomType:
                        if count_rooms_in_hotel[hotel_id][rtype] >= num_rooms:  # if enough rooms available in a hotel
                            hotel = Hotel.query.filter(Hotel.hid == hotel_id).first()
                            room = Room.query.filter(Room.hid == hotel_id, Room.type == rtype).first()
                            # in the dictionary below, rate gives the rate of one room of desired type
                            return_dict[hotel_id][rtype] = {"idx": counter, "id": hotel_id, "name": hotel.hname,
                                                            "address": hotel.location,
                                                            "type": rtype,
                                                            "rate": float("{:.2f}".format(
                                                                get_price(room.baseprice, booking_start)))}
                            counter += 1
                return make_response(return_dict, 200)

        return make_response("Request details not correct!", 404)
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

            days = (datetime.datetime.strptime(booking_end, "%Y-%m-%dT%H:%M:%S.%fZ") -
                    datetime.datetime.strptime(booking_start, "%Y-%m-%dT%H:%M:%S.%fZ")).days

            room_ids = get_room_ids(roomType, booking_start, booking_end, hid)
            if not room_ids or len(room_ids) < num_rooms:
                return make_response("Not enough rooms for reservation!", 404)
            # return_dict = defaultdict(dict)

            # get rewards and add it individually for each room booking

            user = User.query.filter(User.uid == uid).first()
            member_since = (datetime.datetime.strptime(booking_start, "%Y-%m-%dT%H:%M:%S.%fZ") - user.accountDate).days
            loyalty_points_earned = member_since * 0.01

            rewards_used = User.query.filter(User.uid == uid).first().rewards
            rewards_left = 0

            if price * num_rooms * days < rewards_used:
                rewards_left = rewards_used - price * num_rooms * days
                rewards_used = price * num_rooms * days
            User.query.filter(User.uid == uid).update(
                {"rewards": rewards_left})
            individual_reward = rewards_used / num_rooms
            for room_id in room_ids[:num_rooms]:
                rewards_earned = price * days * 0.03  # 3% is the points earned for each room's price
                new_reservation = Reservation(
                    rid=int(room_id),
                    uid=int(uid),
                    hid=int(hid),
                    start=booking_start,
                    end=booking_end,
                    price=float(price) * days,
                    num_people=int(num_people),
                    num_rooms=int(num_rooms),
                    rewards_earned=int(rewards_earned + loyalty_points_earned),
                    rewards_used=int(individual_reward)
                )  # Create an instance of the Hotel class
                rewards = User.query.filter(User.uid == uid).first().rewards
                User.query.filter(User.uid == uid).update(
                    {"rewards": rewards + rewards_earned + loyalty_points_earned})
                db.session.add(new_reservation)  # Adds new hotel the database
                db.session.commit()

            return make_response("Booking Successful", 200)
        except:
            return make_response("Booking Failed", 404)

    if request.method == "GET":
        try:
            uid = request.args.get('userID')
            if uid == "all":
                res = Reservation.query.all()
            else:
                res = Reservation.query.filter(Reservation.uid == uid).all()
            res_dict = defaultdict(dict)
            counter = 1

            for r in res:
                hotel = Hotel.query.filter(Hotel.hid == r.hid).first()
                room = Room.query.filter(Room.rid == r.rid).first()
                res_dict[counter] = {
                    "roomtype": room.type,
                    "hname": hotel.hname,
                    "idx": counter,
                    "reservation_id": r.reserve_id,
                    "rid": r.rid,
                    "hid": r.hid,
                    "start": r.start,
                    "end": r.end,
                    "price": r.price,
                    "num_rooms": r.num_rooms,
                    "num_people": r.num_people,
                    "rewards_earned": r.rewards_earned,
                    "rewards_used": r.rewards_used
                }
                counter += 1

            return make_response(res_dict, 200)
        except:
            return make_response("Oops, an error occurred!", 404)

    if request.method == "DELETE":
        try:
            data = request.get_json()
            reservation_id = data["reservationID"]

            res = Reservation.query.filter(Reservation.reserve_id == reservation_id).first()
            rewards_used = res.rewards_used  # rewards used for the reservation
            rewards_earned = res.rewards_earned  # rewards earned for the reservation
            rewards = User.query.filter(User.uid == res.uid).first().rewards  # get user rewards
            new_reward = max(0, rewards + rewards_used - rewards_earned)  # calculate new rewards
            User.query.filter(User.uid == res.uid).update({"rewards": new_reward})  # update rewards

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


@app.route("/rewards", methods=["GET"])
@cross_origin()
def rewards():
    if request.method == "GET":
        try:
            uid = request.args.get("userID")
            res = User.query.filter(User.uid == uid).first()
            res_dict = {"rewards": res.rewards}
            return make_response(res_dict, 200)
        except:
            return make_response("Oops! An error occurred", 404)
