const Users = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const handleLogin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Please provide username and password" });
	}
	const foundUser = await Users.findOne({ username }).exec();
	if (!foundUser) {
		return res.status(401).json({ error: "User not found" });
	}
	try {
		if (await bcrypt.compare(password, foundUser.password)) {
			// create JWT
			const accessToken = createAccessToken(foundUser);
			const refreshToken = createRefreshToken(foundUser);

			//save refresh token to current user in db
			foundUser.refreshToken = refreshToken;
			await foundUser.save();

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
			expiresIn: "1h",
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
