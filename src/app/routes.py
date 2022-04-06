"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for

from .models import User, db


@app.route("/", methods=["POST"])
def user_records():
    """Create a user via query string parameters."""
    data = request.get_json()
    username = data["user"]
    email = data["email"]
    print(type(username), email, request.get_json())
    if username and email:
        existing_user = User.query.filter(
            User.name == username or User.email == email
        ).first()
        if existing_user:
            return make_response(f"{username} ({email}) already created!")
        new_user = User(
            name=username,
            email=email,
            password="password"
            # created=dt.now(),
            # bio="In West Philadelphia born and raised, \
            # on the playground is where I spent most of my days",
            # admin=False,
        )  # Create an instance of the User class
        db.session.add(new_user)  # Adds new User record to database
        db.session.commit()  # Commits all changes
        redirect(url_for("user_records"))
    res = User.query.all()
    # for r in res:
    #     res.
    print(res)
    return "hello"
    # return render_template("users.jinja2", users=User.query.all(), title="Show Users")


@app.route("/adduser", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data["user"]
    email = data["email"]
    password = data["password"]
    rewards = data["rewards"]

    # check if not empty
    if username and email and password:
        existing_user = User.query.filter(
            User.name == username or User.email == email
        ).first()  # first is used to return the first result or None if result doesn't contain any row
        if existing_user:
            return make_response(f"{username} ({email}) already created!")
        new_user = User(
            name=username,
            email=email,
            password=password,
            rewards=rewards
        )  # Create an instance of the User class
        db.session.add(new_user)  # Adds new User record to database
        db.session.commit()  # Commits all changes

    # have to be deleted later
    res = User.query.all()
    for r in res:
        print(r.name)
    return "data added"



@app.route("/addhotel", methods=["POST"])
def add_hotel():
    pass


@app.route("/addroom", methods=["POST"])
def add_room():
    pass


@app.route("/addreservation", methods=["POST"])
def add_reservation():
    pass
