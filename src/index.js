import './styles.css';
import getRefs from './js/getRefs.js';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import countryInfo from './templates/countryInfo.hbs';
import debounce from 'lodash.debounce';
import { alert } from "@pnotify/core/dist/PNotify";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
let searchQuery = '';
refs.input.addEventListener('input', debounce(onSearch, 500));

function renderCountries(country) {
    if (!country) {
        refs.results.innerHTML = '';
        return
    } else if (country.length === 1) {
        const markup = countryInfo(country);
        refs.results.insertAdjacentHTML('beforeend', markup);
    } else if (country.length <= 10) {
        const markup = countriesList(country);
        refs.results.insertAdjacentHTML('beforeend', markup);
    } else if (country.length > 10) {
        alert('Too many matches found. Please enter a more specific query!');
    } 
};

function onSearch(e) {
    refs.results.innerHTML = '';
    searchQuery = refs.input.value.trim();
    if (!searchQuery) {
        return
    };
    // console.log(searchQuery)
    fetchCountries(searchQuery)
        .then(renderCountries)
};