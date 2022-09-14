console.log("Hello, World");
const sum = (a,b)=> a+b;
console.log(sum(10,20));
console.log(global);

console.log(process.argv);
const[, ,n1,n2]= process.argv;
console.log(sum(+n1,+n2));