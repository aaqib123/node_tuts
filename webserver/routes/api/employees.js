const express = require("express");
const router = express.Router();
const {
	getAllemployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../controllers/employeeController");
const { ROLES_LIST, ROLES } = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/")
	.get(getAllemployees)
	.post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), createEmployee)
	.put(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), updateEmployee)
	.delete(verifyRoles(ROLES_LIST.admin), deleteEmployee);

router.route("/:id").get(getEmployee);

router.all("*", (req, res) => {
	res.status(404);
	res.json({ error: "invalid" });
});

module.exports = router;
