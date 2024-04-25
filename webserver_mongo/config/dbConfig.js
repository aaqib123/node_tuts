const mongoose = require("mongoose");

const dbConfig = {};

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};

module.exports = { connectDB };
