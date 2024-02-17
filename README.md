# Explanations and Motivations
Background: I was given this project by Kaleb at Jawnt to create a dashboard for managing reimbursement requests. There was some basic guidelines and nudges in the direction of specific technologies. Also a time limit of around 3 hours.

One of these nudges was perfectly natural, so I chose Next.JS to quickly spin up a front end. At the time this project started I probably would've used Nest.JS for the backend/API but the instructions nudged towards a Python answer so I went with Flask. I'm more experienced with Django and probably _like_ FastAPI more but Flask felt like the fastest way to get this going (I might have been wrong there given my inexperience).

From there I tried to keep things simple on both sides and rely on as few libraries/modules/packages as I felt appropriate. This meant I skipped stuff like SQLAlchemy with Flask even though it is something I would likely use in a real production application of this style. 

I stubbed out a Requests page which fetches the data from the Flask API and a Add Request form that saves into a SQLite database. The Management page to update request statuses was just on the horizon when I remembered the prompt asked for test code on the front and back end. I have never written a test for a blueprint in Flask so that didn't quit hit the mark. I think the test code makes sense but I was having trouble getting it to run and I wanted to move on. So I setup a test for one of my more "complicated" frontend components to wrap up the project.

My timeline on this project was disjointed as my start day and my end day were more than a week apart. I chunked the mostly complete code out into commits on the night that I wrapped up writing everything but probably snuck some extra time in debugging the things as I sent them out for deployment. My bad. It is a difficulty for me to send something this incomplete for other people to look at but I'm trying to grow, dangit. Overall it was a fun opportunity to dig into Flask and work more with Next which is something I have enjoyed working with on personal projects lately already.

# Initialize and Start Flask App
Using terminal execute the following commands:

    cd backend
    # Create and use Python Virtual Environment
    python3 -m venv ./.venv
    . .venv/bin/activate

    # Initialize SQLite DB and Run Flask App
    flask --app api init-db
    flask --app api run

# Install dependencies and Start Next App
Using terminal execute the following commands:

    cd frontend
    # Install dependencies
    npm i
    # Run Next app
    npm run dev
    # Run Unit Tests
    npm test

Open the Dashboard at http://127.0.0.1:3000 (or whatever Address:Port your Next App generates)