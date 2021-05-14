import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import debounce from 'lodash.debounce';

const input = document.querySelector('.form-control');
const results = document.querySelector('.results');
input.addEventListener('input', debounce(onSearch, 500));

function renderCounriesList(country) {
const markup = countriesList(country);
    results.insertAdjacentHTML('beforeend', markup);
};

function onSearch(e) {
    const searchQuery = input.value;
    fetchCountries(searchQuery)
        .then(renderCounriesList)
        .catch(error => {
            console.log(error)
            alert('ERROR')
        })
}
