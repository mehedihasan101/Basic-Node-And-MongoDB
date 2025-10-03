const express = require("express");
const mongoose = require("mongoose");
const db = require("./db.js"); // Connect to MongoDB
const passport=require('./authentication.js'); 

const person=require('./person.js')

//require('dotenv').config(); 


// // Initialize Express
const app = express();
app.use(express.json());



//here we use authentication middleware
app.use(passport.initialize()); 
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get("/", localAuthMiddleware,(req, res) => {
  res.send("authentication done..  \n Welcome to my hotel sir"); 
});


// Sample GET routes
app.get("/chicken", (req, res) => {
  res.send("Sure sir, I would love to serve you chicken now");
});


const personRoutes=require('./personRoutes.js'); 
app.use('/person',personRoutes); 

//start server prot come from env file otherwise use default 3000
const PORT= 3000 ;
app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
