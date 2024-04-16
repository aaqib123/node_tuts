const logEvents = require("./logger");
const EventEmiiter = require("events");
class MyEmitter extends EventEmiiter {}

const myEmitter = new MyEmitter();
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
	myEmitter.emit("log", "Hello, world 2!");
}, 2000);
