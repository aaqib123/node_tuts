const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const approach1Main = path.join(__dirname, "dummyfiles", "file_1_Main.txt");
const approach1New = path.join(__dirname, "dummyfiles", "file_1_New.txt");
const approach1Append = path.join(__dirname, "dummyfiles", "file_1_Append.txt");

const approach2Main = path.join(__dirname, "dummyfiles", "file_2_Main.txt");
const approach2New = path.join(__dirname, "dummyfiles", "file_2_Main.txt");
const approach2Append = path.join(__dirname, "dummyfiles", "file_2_Main.txt");

const approach3Main = path.join(__dirname, "dummyfiles", "file_3_Main.txt");
const approach3New = path.join(__dirname, "dummyfiles", "file_3_New.txt");
const approach3Append = path.join(__dirname, "dummyfiles", "file_3_Append.txt");

// Approach 3
const rs = fs.createReadStream(approach3Main, { encoding: "utf8" });
const ws = fs.createWriteStream(approach3New, { encoding: "utf8" });

// rs.on("data", (chunk) => {
// 	console.log("Approach 3", chunk);
// 	ws.write(chunk);
// });
// same as above
rs.pipe(ws);
// --- end ---

// Approach 2
const Approach2 = async () => {
	try {
		const data = await fsPromises.readFile(approach2Main, "utf8");
		console.log("Approach2", data);
		await fsPromises.writeFile(approach2New, ` write to file \n ${data}`);
		await fsPromises.appendFile(approach2Append, "\n  append to file");
	} catch (err) {
		console.error(err);
	}
};
// Approach2();
// --- end ---

// Approach 1
const approach1 = () => {
	fs.readFile(approach1Main, "utf8", (err, data) => {
		if (err) throw err;
		console.log("Approach 1", data);
	});

	fs.writeFile(approach1New, "write to file", (err) => {
		if (err) throw err;
		console.log("File Created.");
	});

	fs.appendFile(approach1Append, "\nappend to file", (err) => {
		if (err) throw err;
		console.log("File Updated.");
	});
};
// approach1();

// process.on("uncaughtException", (err) => {
// 	console.error(`Caught exception: ${err}`);
// 	process.exit(1);
// });
