//for user authentication
const passport=require('passport'); 
const localStrategy=require('passport-local').Strategy ; 
const person=require('./person.js');

//user authentication 
passport.use(new localStrategy(async (USERNAME,password,done)=>{
  //authentication logic here
  try{
    console.log('recive credentials:',USERNAME,password); 
    const user= await person.findOne({username:USERNAME}); 
    if(!user)
      return done(null,false,{message:'incorrect username.'})
    
    const isPasswordMatch= await user.comparePassword(password) ; 
    if(isPasswordMatch){
      return done(null,user); 
    }else{
      return done(null,false,{message:'incorrect password'}) ;
    }
  }catch(err){
    return done(err); 
  }
}))

module.exports=passport; 