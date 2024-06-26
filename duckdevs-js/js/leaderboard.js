async function createTable(){
	const body = document.getElementById('lBody');	


	let data = await fetchData();
	console.log(data);
	data.people.sort((a, b) => {
		if (a.wins === b.wins) {
			return a.name.localeCompare(b.name);
		}
		return a.wins - b.wins;
	});
	console.log(data);
	data.people.forEach(person => {
		const tr = document.createElement('tr');
		const th = document.createElement('th');
		const td = document.createElement('td');

		th.textContent = person.name;
		td.textContent = person.wins;

		body.appendChild(tr);
	  tr.appendChild(th);
		tr.appendChild(td);
	})
}

async function fetchData(){
	const response = await fetch('data/names.json');
	if (!response.ok) {
		throw Error('Error fetching - ' + response.statusText);
	}
	const names = await response.json();
	return names;
}
createTable();
