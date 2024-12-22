'use strict';

(() => {

const collectData = url => fetch(url).then(response => response.json())

const generateCountriesHTML = countries => {
    const newCountriesHTML = countries.map(country => {
        const {name: {common}, population} = country
        return `
        <tr>
                <td>${common}</td>
                <td>${population}</td>
            </tr>
        `
    }).join('')
    return newCountriesHTML;
}

const generateCountriesStatsHTML = countries => {
    const numberOfCountries = countries.length
    console.log(numberOfCountries)
}

const renderCountriesHTML = newCountriesHTML => document.getElementById('countriesTBody').innerHTML = newCountriesHTML

const renderCountriesStatsHTML = newCountriesStats => {
    //
}



document.getElementById('countriesForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const countriesData = await collectData('https://restcountries.com/v3.1/all');
    const countriesHTML = generateCountriesHTML(countriesData)
    const countriesStats = generateCountriesStatsHTML(countriesData)
    renderCountriesHTML(countriesHTML)
    renderCountriesStatsHTML(countriesStats)

})

document.getElementById('showNameData').addEventListener('click', (event) => {
    event.preventDefault()
})


})()