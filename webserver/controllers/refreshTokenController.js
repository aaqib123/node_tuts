let users = [];
usersDB = require("../model/users.json");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	console.log("cookies: ", cookies);

	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	const refreshToken = cookies.jwt;
	const user = usersDB.find((user) => user.refreshToken === refreshToken);

	if (!user) {
		return res.sendStatus(403); //forbidden
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		const accessToken = createAccessToken(user);
		res.status(200).json({ accessToken });
	});
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

module.exports = {
	handleRefreshToken,
};
