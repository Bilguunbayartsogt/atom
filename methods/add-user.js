const addButton = document.getElementById("add");

addButton.addEventListener("click", async () => {
	const name = document.getElementById("name").value;
	const lastName = document.getElementById("last_name").value;
	const age = document.getElementById("age").value;

	if (!name || !lastName || !age) {
		window.alert("Fill all the fields!");
		return;
	}

	if (!/^[A-Za-z]+$/.test(name) || !/^[A-Za-z]+$/.test(lastName)) {
		window.alert(
			"Enter a valid First name and Last name! They must be in Latin letters!"
		);
		return;
	}

	if (age < 0 || age > 120) {
		window.alert("Enter a valid age between 0 and 120!");
		return;
	}

	try {
		const response = await fetch("/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, lastName, age }),
		});

		const result = await response.json();
		if (result.success) {
			console.log("Data inserted successfully");
			window.alert("User Added Successfully!");
			document.getElementById("name").value = null;
			document.getElementById("last_name").value = null;
			document.getElementById("age").value = null;
		} else {
			window.alert("Error Adding User!");
		}
	} catch (err) {
		console.error("Error:", err);
		window.alert("Error Adding User!");
	}
});
