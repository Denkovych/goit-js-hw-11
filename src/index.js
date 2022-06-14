var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
import './css/styles.css';
import {fetchCountryByName, makeMarkupCountry,renderCountryCard,makeMarkupCountryList} from './fetchCountries.js';
export {refs};
const refs={
    searchCountry : document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info')
}


refs.searchCountry.addEventListener('input',debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e){
    e.preventDefault()
    if(e.target.value !== '')
    {console.log(e.target.value)
    name = e.target.value.trim();
    fetchCountryByName(name);}
}



