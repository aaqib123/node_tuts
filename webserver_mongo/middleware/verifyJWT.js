const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer")) {
		return res.status(401).json({ error: "Access denied" });
	}
	console.log("authHeader: ", authHeader);

	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "Access denied" });
	}
	console.log("token: ", token);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
		if (err) {
			return res.status(403).json({ error: "Access denied" });
		}
		req.user = decodedUser.userInfo.username;
		req.roles = decodedUser.userInfo.roles;
		next();
	});
};

module.exports = verifyJWT;
