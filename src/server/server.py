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

@app.route('/')
def landingPage():
    return "This is the landing Page of the hotel app"




if __name__ == "__main__":
    app.run(debug=True)
