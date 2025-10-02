const fs = require('fs'); 

const ourReadStream = fs.createReadStream(`${__dirname}/Data.txt`); 
const ourWriteStream = fs.createWriteStream(`${__dirname}/writeData.txt`); 

//1st method for write
// ourReadStream.on('data', (chunk) => {
//     ourWriteStream.write(chunk); 
// });


//2nd method for write
//we can use only this line for write data into file 
ourReadStream.pipe(ourWriteStream); 