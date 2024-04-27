const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema({
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
});

module.exports = mongoose.model("Employee", employeeSchema);
