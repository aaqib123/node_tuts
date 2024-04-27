const { UUID } = require("mongodb");
const Employees = require("../model/Employee");

const getAllemployees = async (req, res) => {
	const emp = await Employees.find();
	if (emp.length === 0) {
		return res.status(204).json({ message: "No employee found" });
	}
	res.json(emp);
};

const createEmployee = async (req, res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	if (!firstname || !lastname) {
		return res
			.status(400)
			.json({ error: "Please provide firstname and lastname" });
	}

	try {
		const emp = {
			firstname: firstname,
			lastname: lastname,
		};
		const result = await Employees.create(emp);
		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
};

const updateEmployee = async (req, res) => {
	const id = req.body.id;
	if (!id) {
		return res.status(400).json({ error: "Please provide employee id" });
	}
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const foundEmp = await Employees.findOne({ _id: id }).exec();
	if (!foundEmp) {
		return res.status(204).json({ error: "Employee not found" });
	}

	if (firstname) {
		foundEmp.firstname = firstname;
	}
	if (lastname) {
		foundEmp.lastname = lastname;
	}
	const result = await foundEmp.save();

	res.json(result);
};

const deleteEmployee = async (req, res) => {
	const id = req.body.id;
	if (!id) {
		return res.status(400).json({ error: "Please provide employee id" });
	}
	const emp = await Employees.deleteOne({ _id: id });
	res.json(emp);
};

const getEmployee = async (req, res) => {
	const id = req.params.id;
	const result = await Employees.findById(id);
	res.json(result);
};

module.exports = {
	getAllemployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
