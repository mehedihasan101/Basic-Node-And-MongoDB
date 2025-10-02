const http=require('http'); 
const fs=require('fs'); 

const server=http.createServer((req,res)=>{
    //it read all data from data.txt file 
    const myReadStream=fs.createReadStream(`${__dirname}/Data.txt`); 
    
    //it write data into server
    myReadStream.pipe(res); 

}); 

server.listen(3000); 
console.log("server is listening on port 3000"); 
