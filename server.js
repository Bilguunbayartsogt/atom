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

app.get("/sign-up", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "sign-up.html"));
});

// API endpoints
app.post("/submit", async (req, res) => {
	const { first_name, last_name, user_name, password } = req.body;

	try {
		await client.query("BEGIN"); // Start transaction

		// Insert into users table and get the user_id
		const userQuery =
			"INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING user_id";
		const userResult = await client.query(userQuery, [first_name, last_name]);
		const userId = userResult.rows[0].user_id;

		// Insert into auth table using the user_id from users table
		const authQuery =
			"INSERT INTO auth (user_id, user_name, password) VALUES ($1, $2, $3)";
		await client.query(authQuery, [userId, user_name, password]);

		await client.query("COMMIT");
		res.json({ success: true });
	} catch (err) {
		await client.query("ROLLBACK");
		console.error(err);
		res.status(500).json({ error: "Failed to insert data" });
	}
});

app.get("/api/users", async (req, res) => {
	try {
		const result = await client.query("SELECT * FROM users");
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
