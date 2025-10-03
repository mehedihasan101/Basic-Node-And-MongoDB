const mongoose = require("mongoose");
const bcrypt=require('bcrypt'); //for hassing the password
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
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

});

personSchema.pre('save',async function(next) {
  const person=this; 

  //hash the password only if it has been modifyed (old hassed password or not hassed password seta check korbe)
  if(!person.isModified('password')) return next(); 

  try{
    //hash salt generation
    const salt=await bcrypt.genSalt(10); 

    //hash the password 
    const hashedPassword= await bcrypt.hash(person.password,salt); 

    //ovveride the plain password with the hashed one
    person.password= hashedPassword; 

    next(); 

  }catch(err){
    return next(); 
  }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
  try{
    //use bcrypct to compare the password with hashed password
    const isMatch=await bcrypt.compare(candidatePassword,this.password) ;
    return isMatch;
  }catch(err){
    throw err; 
  }
}


// Create model
const person = mongoose.model("Person", personSchema);

module.exports = person;
