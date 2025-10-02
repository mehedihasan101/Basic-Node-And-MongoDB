const mongoose = require("mongoose");

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "waiter", "manager"]
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  salary: {
    type: String,
    required: true
  }
});

// Create model
const person = mongoose.model("Person", personSchema);

module.exports = person;
