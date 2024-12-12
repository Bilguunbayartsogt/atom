async function displayUsers() {
	try {
		const response = await fetch("/api/users");
		const users = await response.json();

		const app = document.getElementById("app");
		const usersList = users
			.map(
				(user) => `
            <div class="user">
                <h2>${user.first_name} ${user.last_name}</h2>
            </div>
        `
			)
			.join("");

		app.innerHTML = `
            <h1>Users List</h1>
            ${usersList}
        `;
	} catch (err) {
		console.error("Error:", err);
		document.getElementById("app").innerHTML = "<p>Error loading users</p>";
	}
}

// Load users when the page loads
document.addEventListener("DOMContentLoaded", displayUsers);
