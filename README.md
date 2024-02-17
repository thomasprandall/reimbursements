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