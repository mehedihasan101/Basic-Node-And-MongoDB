const fs=require('fs'); 

const ourReasStream=fs.createReadStream(`${__dirname}/readData.txt`); 

ourReasStream.on('data',(chunk)=>{
    //console.log(chunk); 
    console.log(chunk.toString()); 
}); 

console.log('it run first then buffer works'); 