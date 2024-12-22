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
    const numberOfCitizensInCountries = countries.reduce((sum, country) => {
        const {population} = country
        return sum+population
    },0)
    const averageCitizens = (numberOfCitizensInCountries / numberOfCountries).toFixed(2)
    return `
    <li>Num of Countries: ${numberOfCountries}</li>
    <li>num of world citizens ${numberOfCitizensInCountries}</li>
    <li>average of citizens is: ${averageCitizens}</li>
    `
}

const renderCountriesHTML = newCountriesHTML => document.getElementById('countriesTBody').innerHTML = newCountriesHTML

const renderCountriesStatsHTML = newCountriesStats => document.getElementById('basicUlStats').innerHTML = newCountriesStats


{/* <tr>
                <td>${region}</td>
                <td>${name.common}</td>
            </tr> */}


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