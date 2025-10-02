const path=require('path'); 

const myPath='D:/Node/Basic Node/export_import/export.js';

console.log(path.parse(myPath)); //that return an object. 
console.log(path.dirname(myPath)); //privde the folder path. 
console.log(path.extname(myPath)); // provide the extention name. 
