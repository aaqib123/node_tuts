const fs = require("fs");

const newDirectoryName = "newDir";

const createNewDirectory = (dirName) => {
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName);
		console.log("Directory Created.");
	} else {
		console.log("Directory already exists.");
	}
};

const deleteDirectory = (dirName) => {
	if (fs.existsSync(dirName)) {
		fs.rmdir(dirName, (err) => {
			if (err) throw err;
			console.log("Directory Deleted.");
		});
	} else {
		console.log("Directory does not exist.");
	}
};

createNewDirectory(newDirectoryName);
console.log("deleting directory in 2 seconds.");
setTimeout(() => {
	deleteDirectory(newDirectoryName);
}, 2000);
