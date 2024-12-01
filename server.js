const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const client = new Client({
	user: "bilguun",
	host: "localhost",
	database: "mydatabase",
	password: "your_password",
	port: 5432,
});

client
	.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Connection error", err.stack));

// Routes for pages
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add-user", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "add-user.html"));
});

app.get("/users", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "users.html"));
});

app.get("/habit", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "add-habit.html"));
});

// API endpoints
app.post("/submit", async (req, res) => {
	const { name, lastName, age } = req.body;

	try {
		const query =
			"INSERT INTO info_table (first_name, last_name, age) VALUES ($1, $2, $3)";
		await client.query(query, [name, lastName, age]);
		res.json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to insert data" });
	}
});

app.get("/api/users", async (req, res) => {
	try {
		const result = await client.query("SELECT * FROM info_table");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch users" });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
