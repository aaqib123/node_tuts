let users = [];
usersDB = require("../model/users.json");
const fsPromises = require("fs").promises;
const path = require("path");
require("dotenv").config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	console.log("cookies: ", cookies);
	const refreshToken = cookies?.jwt;
	console.log("refreshToken: ", refreshToken);
	if (!refreshToken) {
		return res.sendStatus(204); // no content
	}

	const user = usersDB.find((user) => user.refreshToken === refreshToken);
	console.log("user: ", user);
	// if user not found, return 204 and delete cookie
	if (!user) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(204);
	} else {
		// remove refresh token from user in db
		const otherUsers = usersDB.filter((u) => u.username !== user.username);
		console.log("otherUsers: ", otherUsers);
		const currUser = { ...user, refreshToken: "" };
		console.log("currUser: ", currUser);
		await fsPromises.writeFile(
			path.join(__dirname, "../model/users.json"),
			JSON.stringify([...otherUsers, currUser])
		);
		res.clearCookie("jwt", { httpOnly: true });
		res.status(200).json({ message: "User logged out" });
	}
};

module.exports = {
	handleLogout,
};
