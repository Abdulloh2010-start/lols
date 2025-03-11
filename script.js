const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const darkModeButton = document.querySelector('.dark-mode');

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        card.addEventListener("click", () => {
            window.location.href = `countries.html?name=${encodeURIComponent(country.name.common)}`;
        });
        countriesContainer.appendChild(card);
    });
}


searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
});

filterSelect.addEventListener("change", () => {
    const selectedRegion = filterSelect.value;
    if (selectedRegion === "") {
        displayCountries(allCountries);
    } else if (selectedRegion === "Africa") {
        displayCountries(allCountries.filter(country => country.region === "Africa"));
    } else if (selectedRegion === "Americas") {
        displayCountries(allCountries.filter(country => country.region === "Americas"));
    } else if (selectedRegion === "Asia") {
        displayCountries(allCountries.filter(country => country.region === "Asia"));
    } else if (selectedRegion === "Europe") {
        displayCountries(allCountries.filter(country => country.region === "Europe"));
    } else if (selectedRegion === "Oceania") {
        displayCountries(allCountries.filter(country => country.region === "Oceania"));
    }
});

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
})

fetchCountries();