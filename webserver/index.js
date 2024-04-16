const express = require("express");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3500;

const one = (req, res, next) => {
	console.log("one");
	next();
};
const two = (req, res, next) => {
	console.log("two");
	next();
};
const three = (req, res, next) => {
	console.log("three");
	res.send("done");
};

app.use(logger);

const whitelist = ["http://localhost:3500", "https://www.google.com"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
	console.log("req: ", req.url, req.method);
	res.send("Hello World");
});

app.get("/about", (req, res) => {
	res.send("About us page");
});

app.get("/contact", (req, res) => {
	res.send("Contact us page");
});
app.get("/chain", [one, two, three]);

// app.get("/*", (req, res) => {
// 	res.status(404).send("404 page not found");
// });

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		("<h1>404 page not found</h1>");
	} else if (req.accepts("json")) {
		res.json({ error: "Not found" });
	} else {
		res.type("txt").send("Not found");
	}
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
