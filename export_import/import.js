const student =require('./export.js'); 

console.log(student.a); 
console.log(student.people); 
student.test(); 

//use lodash last function for finding last element of people; 
const _ =require('lodash'); 
console.log(_.last(student.people)); 
