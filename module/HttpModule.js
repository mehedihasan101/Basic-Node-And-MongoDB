/*
const http=require('http'); 

const server=http.createServer(); 

server.on('connection',()=>{
    console.log('new conenction on port 3000'); 
}); 

server.listen(3000); 
console.log('server is listening on port 3000'); 
*/

const http=require('http'); 
const server=http.createServer((req,res)=>{
    res.write('Hello programmers '); 
    res.write('HoW are you '); 
    res.end(); 
}); 

server.listen(3001); 
console.log('server is listening on port 3000'); 