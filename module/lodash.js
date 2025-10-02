//in the loadsh there was so may bulit in function which is very healpfull for us

var _ = require('lodash');

// 1. _.uniq – Remove duplicates
const arr = [1, 2, 2, 3, 4, 4, 'mehedi', 'mehedi'];
console.log("uniq:", _.uniq(arr)); 
// [1,2,3,4,'mehedi']

// 2. _.isString – Check string
console.log("isString('mehedi'):", _.isString('mehedi')); // true
console.log("isString(123):", _.isString(123)); // false

// 3. _.isNumber – Check number
console.log("isNumber(42):", _.isNumber(42)); // true
console.log("isNumber('42'):", _.isNumber('42')); // false

// 4. _.isEmpty – Check if object/array/string is empty
console.log("isEmpty([]):", _.isEmpty([])); // true
console.log("isEmpty({}):", _.isEmpty({})); // true
console.log("isEmpty('mehedi'):", _.isEmpty('mehedi')); // false

// 5. _.isEqual – Deep compare
console.log("isEqual:", _.isEqual({a:1}, {a:1})); // true

// 6. _.cloneDeep – Deep copy objects/arrays
let obj = {a:1, b:{c:2}};
let copy = _.cloneDeep(obj);
copy.b.c = 99;
console.log("cloneDeep original:", obj); // unchanged

// 7. _.merge – Merge objects deeply
let o1 = {a:1, b:{x:1}};
let o2 = {b:{y:2}, c:3};
console.log("merge:", _.merge({}, o1, o2)); 
// {a:1, b:{x:1,y:2}, c:3}

// 8. _.flatten – Flatten 1 level array
console.log("flatten:", _.flatten([1, [2, [3]]])); 
// [1,2,[3]]

// 9. _.flattenDeep – Flatten completely
console.log("flattenDeep:", _.flattenDeep([1, [2, [3]]])); 
// [1,2,3]

// 10. _.groupBy – Group array by property/value
let users = [
  {name:"mehedi", age:25},
  {name:"hasan", age:25},
  {name:"arif", age:30},
   {name:"arif", age:20}
];
console.log("groupBy age:", _.groupBy(users, 'age')); 
// {25:[{...},{...}], 30:[{...}]}

// 11. _.sortBy – Sort array of objects
console.log("sortBy age:", _.sortBy(users, 'age')); 

// 12. _.random – Random number
console.log("random 1-100:", _.random(1,100)); 

// 13. _.debounce – Control function calls (useful in search boxes)
const search = _.debounce((q)=>console.log("Searching:", q), 500);
search("mehedi");
search("mehedi hasan"); // only last call executes after delay

