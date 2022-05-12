# Hello 202
Team Members: 
- Adam Hashoush
- Josef Bustamante
- Karan Tyagi
- Priyank Bardolia

## Responsibilities
<b>Front End</b>: Josef Bustamante and Priyank Bardolia <br>
<b>Back End</b>: Adam Hashoush and Karan Tyagi

### <a href="https://github.com/gopinathsjsu/team-project-hello-202/projects/1">Project Board</a>
### <a href="https://docs.google.com/spreadsheets/d/1wgkN_WqxkeQRdMGvOr733T3c4LXscIJXHMCM-ewpsms/edit?usp=sharing">Google Spring Task Sheet</a>

## XP Core Values

- ***Communication***: We sucessfully conducted meetings every week on zoom/ in-person to discuss crucial aspects of the project by collaborating and communicating with each other.
- ***Respect***: Since day one, the decisions pertaining to the project were made by keeping in mind every team members opinion. Apart from that we have been empathatic towards each other by helping each other in resolving code blocks and learning together.
-  ***Feedback***: We developed a habit of giving feedback to the team after every commit, so that we can create the best user experience with zero road blocks. Apart from that we as a team have modified our application based on the suggestions by the team.
- ***Simplicity***: As a team we have focused on simplicity in our project from day one by delivering only the essential and useful, so that we can remove the unnecessary clutter and make things less complicated.
- ***Courage***: We as a team of Programmers have objectively evaluated our own results without making excuses and were always ready to respond to changes.
  
<b>How the team kept the core value? <br></b><br>
- Team meetings in which diagrams were made to convey the structure of the tables in the back-end <br>
- Mock-ups of how the front-end will look like on Figma. <br>
- Every Standup includes discussing the work done, the challenges and whether there is any deviation in the implementation from the diagrams and mockups.

## TECHSTACK:

- Frontend: ReactJS, Webpack, NPM, CSS, Babel
- Backend: FlaskSqlAlchemy, RDS
- Database: SQLAlchemy
- REST API: Postman(Testing APIs)
- Cloud: AWS Elastic Beanstalk

## TASKS COMPLETED:

- Backend
  - Explore SQLAlchemy
  - Create all the tables and AddData methods as per the Schema Diagrams discussed during the meetings (initially with an in-memory db)
  - Explore ec2 and Amazon Relational Database Service (RDS) using a basic schema. Need DB to be persistent.
  - Added Tables:
    - User
    - Room
    - Hotel
    - Reservation
  - Added API Calls:
    - /login
    - /user
    - /hotel
    - /room
    - /availability
    - /reservation
    - /rewards
  - Implemented Dynamic Pricing
  - Implemented Seasonal Pricing
  - Deploying docker image on Elastic Beanstalk (with every feature release)

- Frontend
  - Create Routing
  - Create SignIn and SignUp pages
  - Create Dashboard related components
  - Create Header & Footer
  - Create Sidebar
  - Create Routing on Sidebar
  - Add Links to Sidebar
  - Create Hotel Search
  - Create Hotel add for Admin
  - Create Room add for Admin
  - Create My Trips page
  - Add Card View for users Trips
  - Add Pagination on My Trips
  - Create Booking Modal
  - Add different rooms on booking
  - Add Card View for different rooms
  - Add Amenities on Room Book
  - Add Pagination on Hotel search
  - Add Dynamic price addition on checking amenities
  - Create Rewards on Room book
  - Add Dynamic Price Deduction on room book using rewards


## UI Wireframes:

### <a href="https://www.figma.com/file/K7rA2OWtDBw8fHhUVRApMr/Simple-Hotel-Website-(Community)?node-id=0%3A1">Figma Link</a>


![Diagram](https://user-images.githubusercontent.com/50338345/168151525-6d633a88-4dd8-4ba4-ae06-71792cb16a53.png
)

## Deployment Diagrams

## Design Decisions:


## Feature Set:


# Scrum Meeting Notes

## Schedule for Scrum Meetings:
- Monday
- Friday

## Week 1:
  - February 28
    - Went through project guidelines to start brainstorming
  - March 4
    - who does what and finding tech stack to use (software, etc.)

## Week 2:
  - March 7
    - Finalizing tech stack
      - Frontend: React
      - Backend: Flask SQLAlchemy with DB deployed on AWS RDS
  - March 11
    - Created Schema diagram on Figma

## Week 3:
  - March 14
    - Setting up basic flask-sqlalchemy application
  - March 18
    - API design - functions/calls we want to have

## Week 4:
  - March 21
    - Added user, hotel and room tables
  - March 25
    - Created add User and add Hotel and add Room API
    - testing on postman

## Week 5:
  - March 28
    - Went through AWS documentation for deploying the basic application created so far
  - April 1
    - Deployed the back-end by dockerizing the flask application and pushing on elastic beanstalk (automatically adds load balancer)

## Week 6:
  - April 4
    - The deployed backend was integrated with the front end for add User and add Hotel and add Room API
  - April 8
    - Added reservation table and /reservation api

## Week 7:
  - April 11
    - Removed bugs and discussed how to add dynamic/seasonal pricing
  - April 15
    - Implemented availability api

## Week 8:
  - April 18
    - Fixed bug in the /availability api logic
  - April 22
    - Rewards api

## Week 9:
  - April 25
    - Implemented dynamic pricing
  - April 29
    - Added Seasonal Pricing

## Week 10:
  - May 2
    - Updated the return objects as per front-end requirements
  - May 6
    - Updated /availability logic, looking for bugs

## Week 11:
  - May 9
    - Edge cases, figure out why elastic beanstalk is showing application health as “severe”
  - May 11
    - Elastic beanstalk health bug fixes, added “/” api to return 200. Now health is “ok”