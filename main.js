
const endpoint = 'https://gist.githubusercontent.com/tarabario/b96161d2bce98c7a1d98be189e850117/raw/9fc6eaf2a10d87e4af2b1a8ef60aedbbce49d28c/ukraine-population.json'
const suggestions = document.querySelector('.suggestions');
const searchInput = document.querySelector('input[type="text"]');

const areas = [];

const request = fetch(endpoint)
	.then(response => response.json())
	.then(data => areas.push(...data));


searchInput.addEventListener('input', (e) => {
	const regex = new RegExp(e.target.value, 'gi');
	let str = '';

	areas
		.filter(obj => obj.city.match(regex))
		.forEach(obj => {
			const matchingSlice = obj.city.match(regex);
			
			const highlighted = `<span class="hl">${obj.city.match(regex)}</span>`;
			const cityWithHighlighted = `<div class="city">${obj.city.replace(matchingSlice, highlighted)}</div>`;
		
			const adminArea = `<div class="admin-area">${obj.admin_name}</div>`;
			
			const commaRegex = /\B(?=(\d{3})+(?!\d))/gi;
			const population = `<div class="population">${obj.population.replace(commaRegex, ',')}</div>`
			
			str += `<li><div class="city-and-admin">${cityWithHighlighted}${adminArea}</div>${population}</li>`;
		});

	if (e.target.value) {
		suggestions.innerHTML = str;
	} else {
		suggestions.innerHTML = '';
	};
})



