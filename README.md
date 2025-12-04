# Overview
We're structured as a vanilla js and html frontend, which calls our express backend, which talks to our supabase database.

# Build and run
Install on your machine:
- nodejs
- nmp

Run `npm install` from the toplevel directory to install project dependencies.

Create a `.env` file in the project directory with
```
SUPABASE_KEY=<our_supabase_prod_key>
SUPABASE_URL=<our_supabase_prod_url>
```

Use `node index.js` to start the project and it should be up and running on [localhost:3000](https://localhost:3000)

# Project Structure
Database-Project-Phas3/
```text
|-- README.md         # you are here
|-- express.js        # server entrypoint
|-- public/           # frontend javascript and html live here
|   |-- ...
|-- data/             # a bunch of csvs to seed the database
|   |-- init.py       # and a script to generate those csvs (your mileage may very)
|   |-- courses.csv
|   |-- ...
|-- supabase/         # supabase cli generate files. this is where our database migrations
|   |-- ...           # live (the things that create tables and change schemas and such)
```


# SQL injection examples
' AND 0=1 ; --
' AND 0=1 ; INSERT INTO courses (course_num, course_name, course_description) VALUES (346345, 'CANNOT INJECT COURS', 'sql injection works') RETURNING *; --
