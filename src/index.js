import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import debounce from 'lodash.debounce';
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

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
            // console.log(error)
            alert('ERROR')
        })
}
