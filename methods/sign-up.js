const addButton = document.getElementById("sign-up");

addButton.addEventListener("click", async () => {
	const first_name = document.getElementById("first_name").value;
	const last_name = document.getElementById("last_name").value;
    const user_name = document.getElementById("user_name").value;
    const password = document.getElementById("password").value;

	if (!first_name || !last_name || !user_name || !password) {
		window.alert("Fill all the fields!");
		return;
	}

	if (!/^[A-Za-z]+$/.test(first_name) || !/^[A-Za-z]+$/.test(last_name) || !/^[A-Za-z]+$/.test(user_name)) {
		window.alert(
			"Enter a valid First name and Last name! They must be in Latin letters!"
		);
		return;
	}

    if (password.length < 4) {
        window.alert("Password must be at least 4 characters long!");
        return;
    }

	try {
		const response = await fetch("/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name, last_name, user_name, password }),
		});

		const result = await response.json();
		if (result.success) {
			console.log("Data inserted successfully");
			window.alert("User Added Successfully!");
			document.getElementById("first_name").value = null;
			document.getElementById("last_name").value = null;
			document.getElementById("user_name").value = null;
			document.getElementById("password").value = null;
		} else {
			window.alert("Error Adding User!");
		}
	} catch (err) {
		console.error("Error:", err);
		window.alert("Error Adding User!");
	}
});
