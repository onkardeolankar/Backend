// console.log(process.argv);

const dbl = (num) => num * 2;
// console.log(dbl(process.argv[2]));

const[, ,n]= process.argv;
console.log(dbl(n));