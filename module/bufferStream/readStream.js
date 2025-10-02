const http = require('http');

const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head>');
        res.write(
            '<body><form method="POST" action="/process"><input name="message" /></form></body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body=[]; 
         req.on('data',(chunk)=>{
            body.push(chunk); 
            //console.log(chunk.toString()); 
         }); 
         req.on('end',()=>{
            console.log('stream finished'); 
            const parsedBody=Buffer.concat(body).toString(); 
            console.log(parsedBody); 
         })
        res.write('This is about us page');
        res.end();
    } else {
        res.write('Not found');
        res.end();
    }
});

server.listen(3000);
console.log('Server is listening on port 3000');
