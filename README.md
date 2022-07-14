# Helicarrier Coding task

This challenge displays a list of fake data using a
test graphql server with functionalities embedded in it to search through the data and apply filters to it.


## Decisions Taken
To run this task, I had to make use of tools at my disposal when stuck, e.g stackoverflow, youtube etc. and to make a global search on the data in all the objects, I nested loop to check all key, values in each object and return items
- I also had to create a graphql server , embedded the schema, resolver, and queries in a single file , "server.js" and added it to my client side

### Steps to running the app

- After cloning the project
- install dependencies `npm install`
- then run `node server.js` to start the graphql server
- open a new terminal
- run `npm start`

`Note: Ensure the server is started before the client app`
