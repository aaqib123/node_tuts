const mongoose = require("mongoose");

const dbConfig = {};

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI, {
			dbName: process.env.DB_NAME,
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};

module.exports = { connectDB };
