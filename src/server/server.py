"""
defining the APIs for hotel booking system
"""

# imports
from flask import Flask, redirect, url_for, render_template, request, session, flash

app = Flask(__name__)  # create an instance of Flask by passing predefined variable __name__ which is set to module name


# connect to Database and create Database session
# !!! Edit code !!!
# engine = create_engine('sqlite:///books-collection.db?check_same_thread=False')
# Base.metadata.bind = engine
#
# DBSession = sessionmaker(bind=engine)
# session = DBSession()

@app.route('/', methods=['POST'])
def create_booking():
    c = Logicclass()
    return c.add_booking(parameters)


@app.route('/trial', methods=['PUT'])
def update_booking():
    return "Updated!"


@app.route('/', methods=['PUT'])
def delete_booking():
    return "Booking deleted!"


# for hotels
@app.route('/', methods=['POST'])
def add_room():
    return "room added"


if __name__ == "__main__":
    app.run(debug=True)
