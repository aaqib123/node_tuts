let data = {};
data.employees = require("../model/employees.json");

const getAllemployees = async (req, res) => {
	res.json(data.employees);
};

const createEmployee = async (req, res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	if (!firstname || !lastname) {
		return res
			.status(400)
			.json({ error: "Please provide firstname and lastname" });
	}
	const emp = {
		id: data.employees.length + 1,
		firstName: firstname,
		lastname: lastname,
	};
	data.employees.push(emp);
	res.status(201).json(emp);
};

const updateEmployee = async (req, res) => {
	const id = req.body.id;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const emp = data.employees.find((emp) => emp.id === id);
	if (!emp) {
		return res.status(404).json({ error: "Employee not found" });
	}
	emp.firstName = firstname;
	emp.lastName = lastname;
	data.employees = data.employees.map((e) => (e.id === id ? emp : e));
	console.log("data: ", data);

	res.json(emp);
};

const deleteEmployee = async (req, res) => {
	const id = req.body.id;
	const emp = data.employees.find((emp) => emp.id === id);
	if (!emp) {
		return res.status(404).json({ error: "Employee not found" });
	}
	data.employees = data.employees.filter((emp) => emp.id !== id);
	res.json(emp);
};

const getEmployee = async (req, res) => {
	const id = req.params.id;
	const emp = data.employees.find((emp) => emp.id === id);
	res.json(emp);
};

module.exports = {
	getAllemployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
