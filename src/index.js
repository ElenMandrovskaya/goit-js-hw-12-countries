import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import countryInfo from './templates/countryInfo.hbs';
import debounce from 'lodash.debounce';
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const input = document.querySelector('.form-control');
const results = document.querySelector('.results');
let searchQuery = '';

input.addEventListener('input', debounce(onSearch, 500));

function renderCounriesList(country) {
    if (country.length === 1) {
        const markup = countryInfo(country);
        results.insertAdjacentHTML('beforeend', markup);
  } else if (country.length <= 10) {
        const markup = countriesList(country);
        results.insertAdjacentHTML('beforeend', markup);
  } else if (country.length > 10) {
    alert('To many matches found. Please enter a more specific query!');
  }
    
};

function onSearch(e) {
 searchQuery = input.value;
    fetchCountries(searchQuery)
        .then(renderCounriesList)
        .catch(onFetchError)
    results.innerHTML = '';

};

function onFetchError(error) {
    alert('ERROR')
};