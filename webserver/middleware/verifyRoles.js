const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.roles) {
			return res.sendStatus(401); // Unauthorized
		}
		const rolesArr = [...allowedRoles];
		console.log("rolesArr: ", rolesArr);
		console.log(req.roles);

		const userhasPermission = req.roles.some((role) => rolesArr.includes(role));

		if (!userhasPermission) {
			return res.sendStatus(401); // Unauthorized
		}

		next();
	};
};

module.exports = verifyRoles;
