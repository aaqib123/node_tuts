const path = require("path");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (message) => {
	const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
	const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, "logs"))) {
			await fs.mkdirSync(path.join(__dirname, "logs"));
		}
		await fsPromises.appendFile(
			path.join(__dirname, "logs", "log.txt"),
			logItem
		);
	} catch (err) {
		console.error(err);
	}
};

module.exports = logEvents;
