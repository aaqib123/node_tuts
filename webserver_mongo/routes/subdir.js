const express = require("express");
const router = express.Router();

router.get("^/$", (req, res) => {
	console.log("req: ", req.url, req.method);
	res.send("Hello World subdir");
});

router.all("*", (req, res) => {
	req.statusCode = 404;
	console.log("req: ", req.url, req.method);
	res.send("Hello World subdir");
});

module.exports = router;
