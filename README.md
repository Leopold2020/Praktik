# Internship

This program was made in on a 10 week intership in Booff swedish football club.
It is not fully functional and will require fixes to set up on the internet.

The reason for the names on the two first folders "data_managment" and "case_1" is because when the intership started we were given three cases, basically three tasks, but the first case where we were to build a website kept growing in scope so we did not manage to start on the other cases. The "data_managment" came from being asked to help in some data that Jörgen requested help with in the middle of the project which led to that one bing created and added to the tasks.

# instructions to launch the project
To launch the project you need to download to your computer
node
postgresql

Go into /case_1 and launch a npm install to download all neccesary libraries.

Add a .env file in /case_1/backend where you will need to add two varibles, REACT_APP_USER_PASSWORD and ACCESS_TOKEN_SECRET. REACT_APP_USER_PASSWORD is to be equal to the postgresql password. The ACCESS_TOKEN_SECRET is the varible the jwt token will use for encryption, it should have a long value of random characters.

In the file /case_1/backend/database/db.sql are the database types and tables you will need to copy into your postgresql sql shell. You can of course create them in pgAdmin, but it was created so you can copy and paste the entire file inte sql shell and work.

In the file /case_1/backend/database/dbFunctions.sql are the functions the project will use in the sql prompts, it was created so you can copy the entire file into sql shell for quick installation.

Once all previous steps are completed you launch the project by running "npm start" in the /case_1 directory, and launching the index.js file in the backend, we launched by writing "nodemn index.js" this should launch the project. If it did not work maybe check if you need to update either node or postgres.

# The structure 

### Frontend

/case_1 is the project directory for the website and here is where npm start is launched

It follows the structure of a newly created react project, with index.js rendering app.js which renders all other pages depending on which page should be open. 

in the src folder there are three folders pages, components and assets. The "pages" folder contains all pages that are 

### Backend

/case_1/backend the directory for backend here you will find a file called index.js, launch it with node indes.js or nodemon indes.js to start the backend.

In /case_1/backend has two folders one called database and another called components. The database folder contains the db.js file, which contains the information to connect to postgresqt. The other three files in the database folder are for sql code to be copied over to postgresql to ensure that the sql functions and tables are the same on all instences of this project.

Between the two folders in the backend folder the components folder is the one containing functions called upon in the index.js file in the backend folder. This was done to shorten and split up the index.js file so it would be more readable.
