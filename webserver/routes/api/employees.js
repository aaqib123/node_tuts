const express = require("express");
const router = express.Router();
const {
	getAllemployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../controllers/employeeController");

router
	.route("/")
	.get(getAllemployees)
	.post(createEmployee)
	.put(updateEmployee)
	.delete(deleteEmployee);

router.route("/:id").get(getEmployee);

router.all("*", (req, res) => {
	res.status(404);
	res.json({ error: "invalid" });
});

module.exports = router;
