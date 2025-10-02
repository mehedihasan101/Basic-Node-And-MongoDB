//##1st type function
/*
function add(a,b){
//     return a+b; 
 }
 */


//var add=(a,b)=>{return a+b}


//var add=(a,b)=> a+b; 

// var result=add(5,10); 
// console.log(result); 


//##2nd type function
(function(){
    console.log('this function one');
})(); 

(()=>{
    console.log('this function two');
})(); 


//##3rd type function
function callback() {
    console.log('this is a callback function');
}
const add = function(a, b, callback) {
    var res = a + b;
    console.log(res);
    callback();
}
add(5, 5, callback);


//another way
const add2 = function(a, b, callback2) {
    var res = a + b;
    console.log(res);
    callback2();
}
add(2,3,function(){
    console.log('this is callback 2 function'); 
})



