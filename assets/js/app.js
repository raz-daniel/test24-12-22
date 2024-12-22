'use strict';

(() => {

    const collectData = url => fetch(url).then(response => response.json())

    const generateCountriesHTML = countries => {
        const newCountriesHTML = countries.map(country => {
            const { name: { common }, population } = country
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
            const { population } = country
            return sum + population
        }, 0)
        const averageCitizens = (numberOfCitizensInCountries / numberOfCountries).toFixed(2)
        return `
    <li>Num of Countries: ${numberOfCountries}</li>
    <li>num of world citizens ${numberOfCitizensInCountries}</li>
    <li>average of citizens is: ${averageCitizens}</li>
    `
    }

    const generateRegionsHTML = countries => {
        const uniqueRegions = [...new Set(countries.map(country => {
            const { region } = country
            return region
        }))]
            .map(region => ({
                region,
                count: countries.filter(country => country.region === region).length
            }))
            .map(area => {
                const { region, count } = area
                return `
                 <tr>
                     <td>${region}</td>
                    <td>${count}</td>
                 </tr>
        `
            }).join('')
        return uniqueRegions;
    }

    const renderCountriesHTML = newCountriesHTML => document.getElementById('countriesTBody').innerHTML = newCountriesHTML

    const renderCountriesStatsHTML = newCountriesStats => document.getElementById('basicUlStats').innerHTML = newCountriesStats

    const renderRegionsHTML = regionsHTML => document.getElementById('regionTBody').innerHTML = regionsHTML




    document.getElementById('countriesForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            const countriesData = await collectData('https://restcountries.com/v3.1/all');
            const countriesHTML = generateCountriesHTML(countriesData)
            const countriesStats = generateCountriesStatsHTML(countriesData)
            const regionsHTML = generateRegionsHTML(countriesData)
            renderCountriesHTML(countriesHTML)
            renderCountriesStatsHTML(countriesStats)
            renderRegionsHTML(regionsHTML)
        } catch (error) {
            console.warn(error)
        }


    })

    const generateCountriesStatsFromInput = (countries, input) => {
        const filteredCountries = countries.filter(country => {
            const {name: {common}} = country
            return common.toLowerCase().includes(input.toLowerCase())
        })
    
        return filteredCountries
    }

    document.getElementById('searchButton').addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            const input = document.getElementById('countryInput').value;
            console.log(input)
            const countriesData = await collectData('https://restcountries.com/v3.1/all');
            const inputCountriesStats = generateCountriesStatsFromInput (countriesData, input)
            const countriesHTML = generateCountriesHTML(inputCountriesStats)
            const countriesStats = generateCountriesStatsHTML(inputCountriesStats)
            const regionsHTML = generateRegionsHTML(inputCountriesStats)
            renderCountriesHTML(countriesHTML)
            renderCountriesStatsHTML(countriesStats)
            renderRegionsHTML(regionsHTML)
        } catch (error) {
            console.warn(error)
        }
    })


})()