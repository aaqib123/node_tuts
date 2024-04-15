const os = require("os");
const path = require("path");
const { add, subtract, divide, multiply } = require("./math");

console.log("math.add(1, 2);: ", add(1, 2));
console.log("subtract(1, 2);: ", subtract(1, 2));
console.log("multiply(1, 2);: ", multiply(1, 2));
console.log("divide(1, 2);: ", divide(1, 2));

// console.log(os.type());
// console.log(os.platform());

// console.log(__dirname);
// console.log(__filename);

// console.log("path.dirname", path.dirname(__filename));
// console.log("path.basename", path.basename(__filename));
// console.log("path.extname", path.extname(__filename));

// console.log("path parse", path.parse(__filename));
