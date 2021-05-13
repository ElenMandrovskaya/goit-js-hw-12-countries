import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';


const input = document.querySelector('.form-control');
const results = document.querySelector('.results');
input.addEventListener('input', onSearch);

function renderCounriesList(country) {
const markup = countriesList(country);
    results.insertAdjacentHTML('beforeend', markup);
};

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.value;
    fetchCountries(searchQuery)
        .then(renderCounriesList)
        .catch(error => console.log(error));
}
