const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
	{
		username: {
			type: String,
			trim: true,
			lowercase: true,
		},
		roles: {
			type: Array,
			default: ["user"],
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
		},
		refreshToken: {
			type: String,
			required: false,
		},
	},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("user", userSchema);
