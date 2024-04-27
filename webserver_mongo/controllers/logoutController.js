const Users = require("../model/User");

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	console.log("cookies: ", cookies);
	const refreshToken = cookies?.jwt;
	console.log("refreshToken: ", refreshToken);
	if (!refreshToken) {
		return res.sendStatus(204); // no content
	}

	const foundUser = await Users.findOne({ refreshToken }).exec();

	// if user not found, return 204 and delete cookie
	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(204);
	}

	try {
		foundUser.refreshToken = "";
		const result = await foundUser.save();
		console.log("result: ", result);
		res.clearCookie("jwt", { httpOnly: true });
		res.status(200).json({ message: "User logged out" });
	} catch (err) {
		console.log("err: ", err);
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	handleLogout,
};
