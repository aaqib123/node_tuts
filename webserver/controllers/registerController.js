let users = [];
usersDB = require("../model/users.json");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Please provide username and password" });
	}
	const user = usersDB.find((user) => user.username === username);
	if (user) {
		return res.status(409).json({ error: "User already exists" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = {
			id: users.length + 1,
			username: username,
			password: hashedPassword,
		};
		await fsPromises.writeFile(
			path.join(__dirname, "../model/users.json"),
			JSON.stringify([...usersDB, newUser])
		);
		res.status(201).json({
			status: "success",
			message: "User created successfully",
			user: newUser,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	handleNewUser,
};
