const os=require('os'); 

console.log(os.freemem()); //show free space in memory
console.log(os.platform()); //it give the platform name ..
 console.log(os.homedir()); //provide the home directory. 
 
var user=os.userInfo(); 
console.log(user); 