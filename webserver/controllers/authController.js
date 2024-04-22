let users = [];
usersDB = require("../model/users.json");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
			// create JWT
			const accessToken = createAccessToken(user);
			const refreshToken = createRefreshToken(user);

			//save refresh token to current user in db
			const otherUsers = usersDB.filter((u) => u.username !== user.username);
			const currUser = { ...user, refreshToken };
			await fsPromises.writeFile(
				path.join(__dirname, "../model/users.json"),
				JSON.stringify([...otherUsers, currUser])
			);
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24, //1d
			});
			res.status(200).json({ accessToken });
		} else {
			res.status(401).json({ error: "Invalid password" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createAccessToken = (user) => {
	return jwt.sign(
		{ userInfo: { username: user.username, roles: user.roles } },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "30s",
		}
	);
};

const createRefreshToken = (user) => {
	return jwt.sign(
		{ username: user.username },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "1d",
		}
	);
};

module.exports = {
	handleLogin,
};
