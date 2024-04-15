const { format, set } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

console.log(uuidv4());

setTimeout(() => {
	console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));
}, 1000);
