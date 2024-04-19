const express = require("express");
const { logger, errorHandler } = require("./middleware/logger");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
const PORT = process.env.PORT || 3500;

// Logger middleware
app.use(logger);

//CORS middleware
app.use(cors(corsOptions));

// middleware to hadnle forms and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes for the app
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

// API routes
app.use("/login", require("./routes/api/auth"));
app.use("/register", require("./routes/api/register"));
app.use("/employees", require("./routes/api/employees"));

// app.get("/*", (req, res) => {
// 	res.status(404).send("404 page not found");
// });

// Handle 404
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		("<h1>404 page not found</h1>");
	} else if (req.accepts("json")) {
		res.json({ error: "Not found" });
	} else {
		res.type("txt").send("Not found");
	}
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
