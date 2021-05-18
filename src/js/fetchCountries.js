import { alert } from "@pnotify/core/dist/PNotify";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
import getRefs from './getRefs.js'
const refs = getRefs();

export default
  function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(resp => {
    //    return resp.json()
      if (resp.ok) return resp.json();
      throw new alert(`NOT FOUND: ERROR ${resp.status}`);
      
    })
        .catch((error) => {
            setTimeout(() => {refs.input.value = '';}, 3000)
            // console.log('error')
        })
};
