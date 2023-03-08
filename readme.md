#Steps to run the code

1. Install Nodejs

1. Create `MongoDB Atlas` account and create a free tier cluester and a database in it

1. clone the project

1. override the connenction string in `server.js` file with your connection string

1. run `npm install` 

1. run node `server.js`

1. goto url: `http://localhost:3000/rooms` to get the rooms data

1. You will get an empty object in the beginning because there are no entries in the database

1. to add new entries use `postman`

1. Am entry example is: `curl -X POST -H "Content-Type: application/json" -d '{"roomNumber": 101, "roomType": "standard", "price": 100, "status": "available"}' http://localhost:3000/rooms/new`
