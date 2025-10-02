const fs=require('fs'); 

fs.writeFileSync('fsFile.txt','Hello Programmers '); 
fs.appendFileSync('fsFile.txt', 'add something new thing '); 

//read data in synchronus way
const data=fs.readFileSync('fsFile.txt'); 
console.log(data.toString()); 


//read data asynchronus way
fs.readFile('fsFile.txt',(err,data)=>{
    console.log(data.toString()); 
}); 