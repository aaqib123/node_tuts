const User = require("../model/User");
const bcrypt = require("bcrypt");
const { ROLES_LIST } = require("../config/rolesList");
const mongoose = require("mongoose");

const handleNewUser = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Please provide username and password" });
	}
	const duplicateUser = await User.findOne({ username }).exec();
	if (duplicateUser) {
		return res.status(409).json({ error: "User already exists" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		//create and store
		const result = await User.create(
			{
				username: username,
				password: hashedPassword,
			},
			{ collection: "users" }
		);

		console.log("result: ", result);

		res.status(201).json({
			status: "success",
			message: "User created successfully",
			user: result,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	handleNewUser,
};
