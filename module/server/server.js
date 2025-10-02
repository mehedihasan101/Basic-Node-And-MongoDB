const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); 
// Connect to MongoDB
const db = require("./db.js");

// // Initialize Express
const app = express();
app.use(express.json());



//for demmo get method
app.get("/", (req, res) => {
  res.send("Welcome to my hotel sir, how can I help you?");
});
// Sample GET routes
app.get("/chicken", (req, res) => {
  res.send("Sure sir, I would love to serve you chicken now");
});



const personRoutes=require('./personRoutes.js'); 
app.use('/person',personRoutes); 

//start server prot come from env file otherwise use default 3000
const PORT=process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
