const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, "errLog.log");
	console.error(err.stack);
	res
		.status(500)
		.send(String("Something broke!", `${err.name}: ${err.message}`));
};

module.exports = errorHandler;
