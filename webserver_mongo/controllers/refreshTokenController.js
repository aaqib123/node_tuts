const Users = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	const refreshToken = cookies.jwt;
	const foundUser = await Users.findOne({ refreshToken }).exec();

	if (!foundUser) {
		return res.sendStatus(403); //forbidden
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err, decodedUser) => {
			if (err || foundUser.username !== decodedUser.username) {
				return res.sendStatus(403);
			}
			const accessToken = createAccessToken(foundUser);
			res.status(200).json({ accessToken });
		}
	);
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
