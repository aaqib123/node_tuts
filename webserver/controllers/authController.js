let users = [];
usersDB = require("../model/users.json");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Please provide username and password" });
	}
	const user = usersDB.find((user) => user.username === username);
	if (!user) {
		return res.status(401).json({ error: "User not found" });
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
			res.status(200).json({ status: "success", message: "Login successful" });
		} else {
			res.status(401).json({ error: "Invalid password" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	handleLogin,
};
