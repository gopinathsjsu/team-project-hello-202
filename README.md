# Hello 202

Team Members:

- Adam Hashoush (015970357)
- Josef Bustamante (015530827)
- Karan Tyagi (015908932) (Branch : <a href="https://github.com/gopinathsjsu/team-project-hello-202/tree/karan_develop">karan_develop</a>)
- Priyank Bardolia (015742532)

## Responsibilities

<b>Front End</b>: Josef Bustamante and Priyank Bardolia <br>
<b>Back End</b>: Adam Hashoush and Karan Tyagi

### Contributions
Karan and Adam worked on the backend. After designing the schema of the tables and APIs they each took up parts of
each to implement. Karan deployed the database on RDS and the flask application on elastic beanstalk while Adam worked
on documentation, testing and verification. <br>

Josef and Priyank worked on the frontend. Both Josef and Priyank set up the directory structure, npm modules, configurations and UI wireframes. Josef and Priyank did a mix of individual and pair programming to implement the UI component, styling and integration with the backend.

### <a href="https://github.com/gopinathsjsu/team-project-hello-202/projects/1">Project Board</a>

### <a href="https://docs.google.com/spreadsheets/d/1wgkN_WqxkeQRdMGvOr733T3c4LXscIJXHMCM-ewpsms/edit?usp=sharing">Google Sprint Task Sheet</a>

![Burndown Chart](https://user-images.githubusercontent.com/50338345/168176940-f590ee05-6356-4257-a2a9-4c287c37ab67.png)

## XP Core Values

- **_Communication_**: We sucessfully conducted meetings every week on zoom/ in-person to discuss crucial aspects of the project by collaborating and communicating with each other.
- **_Respect_**: Since day one, the decisions pertaining to the project were made by keeping in mind every team members opinion. Apart from that we have been empathatic towards each other by helping each other in resolving code blocks and learning together.

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

![Diagram](https://user-images.githubusercontent.com/50338345/168151525-6d633a88-4dd8-4ba4-ae06-71792cb16a53.png)

## Component Diagram:

![Component Diagram](https://user-images.githubusercontent.com/38865668/168175663-c9717dee-b0f4-444f-91d7-193368d672ad.png)

## Architecture Diagram:

![Architecture Diagram](https://user-images.githubusercontent.com/38865668/168181403-3e4b5340-83db-4b1b-bfef-807f03a2db52.png)

## Design Decisions:
When planning the design of this website, we stuck to the core value of simplicity keeping the main task at hand of
allowing a user to book a hotel room in a flow that made sense to us. For each different aspect of
booking a hotel room, we made a table: User, Hotel, Room, Reservation. Our APIs are revolved around actions a user could
take to navigate to a different portion of the website and what the user would expect to receive as a return value.
We tried to make the website simple for a user to navigate through. We implemented pricing in a way that made
sense to us: higher prices on Saturdays/Sundays and also in the months of June, July and December.

## Feature Set:

- **User** can Login/Sign-up an account
- **User** can Make/Update/Cancel reservation.
- **User** can select location/check-in/checkout date for Hotel search
- **User** can select the type of room
- **User** can book a room with/without rewards
- **User** can select the number of rooms/people.
- Based on the **number of people** type of room will be displayed
- **Loyalty points** for user will be incrementally aded since the day user had created an account
- Hotel rates are based on **Dynamic/Seasonal Pricing**
- Booked rooms will be displayed on **My trips** pages
- **User** can go to **different pages** to see their bookings.
- **User** can Login as an **Admin**
- **Admin** can **Create Hotel**
- **Admin** can **Create rooms** for the existing hotels

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
  - Frontend: React JS, HTMl, CSS, JS
  - Backend: Flask SQLAlchemy with DB deployed on AWS RDS
  - Create package.json
  - Create index.js
- March 11
  - Created Schema diagram on Figma
  - Create Directory Stucture
  - Install node packages for react-bootstrap

## Week 3:

- March 14
  - Setting up basic flask-sqlalchemy application
- March 18
  - API design - functions/calls we want to have

## Week 4:

- March 21
  - Added user, hotel and room tables
  - Create Dashboard
  - Create Header
  - Create Footer
- March 25
  - Created add User and add Hotel and add Room API
  - Testing on Postman
  - Create Routes

## Week 5:

- March 28
  - Went through AWS documentation for deploying the basic application created so far
  - Create Landing Page Component
  - Create routes on the Landing Page
- April 1
  - Deployed the back-end by dockerizing the flask application and pushing on elastic beanstalk (automatically adds load balancer)
  - Create Hotel Search Form/ Hotel Search Page/List view for the card

## Week 6:

- April 4
  - The deployed backend was integrated with the front end for add User and add Hotel and add Room API
  - Create Card Component for the List view of cards
  - Create My Trips Page
  - Create Input fields for search form
- April 8
  - Added reservation table and /reservation api
  - Create List view component for Hotel data
  - Add styling on my trips page

## Week 7:

- April 11
  - Removed bugs and discussed how to add dynamic/seasonal pricing
  - Create input field for Trips Page
  - Create Login Form
  - Create Logout functionality
- April 15
  - Implemented availability api
  - Create Sign-up Form
  - Create Hotel creation Page
  - Create Hotel room add Page

## Week 8:

- April 18
  - Fixed bug in the /availability api logic
  - Add Pagination to the Hotel Search/Trips Page
  - Add Modal on Hotel Search Page
  - Create Sidebar Component
- April 22
  - Rewards api
  - Add Card view on Modal for Room Type
  - Create Book successful Modal
  - Create Boooking Error Modal
  - Fix Bugs regarding Pagination

## Week 9:

- April 25
  - Implemented dynamic pricing
  - Local storage Implementation
  - Add jwt token on Login
  - Integrate API fetch calls
- April 29
  - Added Seasonal Pricing
  - Create Local Storage for rewards
  - Fix bugs regaring booking success/error

## Week 10:

- May 2

  - Updated the return objects as per front-end requirements
  - Add Sidebar Links
  - Add Sidebar Navigation

- May 6
  - Updated /availability logic, looking for bugs
  - Refactor UI Components
  - Fix bugs regarding Landing Page
  - Fix bugs regarding Modal

## Week 11:

- May 9
  - Edge cases, figure out why elastic beanstalk is showing application health as “severe”
  - Change fetch calls to Deployed API
  - Fix bugs regarding Sidebar
  - Testing the Website for bugs
- May 11
  - Elastic beanstalk health bug fixes, added “/” api to return 200. Now health is “ok”
  - Fix bugs reagrding Hotel Page
  - Testing the website for bugs
