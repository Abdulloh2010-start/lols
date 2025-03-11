const selectedCountry = document.querySelector('.selected-country');

async function fetchCountries() {
    try {
        const countryName = getQueryParam('name');
        if (!countryName) {
            throw new Error("Название страны не указано в параметрах URL");
        }
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const allCountries = await response.json();
        
        if (!allCountries || allCountries.length === 0) {
            throw new Error("Страна не найдена");
        }
        
        displayCountry(allCountries[0]);
    } catch (error) {
        console.error("Ошибка:", error);
        selectedCountry.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayCountry(country) {
    selectedCountry.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <p><strong>Столица:</strong> ${country.capital ? country.capital[0] : "Нет данных"}</p>
        <p><strong>Население:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Регион:</strong> ${country.region}</p>
    `;
}

function goBack() {
    window.history.back();
}

// Вызываем функцию для загрузки данных
fetchCountries();
