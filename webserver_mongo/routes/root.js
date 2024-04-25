const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
	console.log("req: ", req.url, req.method);
	res.send("Hello World");
});

router.get("/about", (req, res) => {
	res.send("About us page");
});

router.get("/contact", (req, res) => {
	res.send("Contact us page");
});
router.get("/chain", [one, two, three]);

module.exports = router;
