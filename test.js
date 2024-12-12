fetch("https://jsonplaceholder.typicode.com/users")
	.then((res) => res.json())
	.then((data) => {
		const user = data[0];
		console.log(user.name);
		for (key in user) {
			console.log(key);
		}
	});

let html = "";
json.forEach(function (val) {
	const keys = Object.keys(val);
	html += "<div class = 'cat'>";
	keys.forEach(function (key) {
		html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
	});
	html += "</div><br>";
});
