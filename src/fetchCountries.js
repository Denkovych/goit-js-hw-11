import {refs} from './index.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountryByName(name){
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response =>{
        if (!response.ok) {
            throw new Error(response.status);
          } 
    return response.json();
    })
    .then(country=>{
        if(country.length > 10){
            refs.infoCountry.classList.add('is-hidden');
            refs.listCountry.classList.add('is-hidden');
            Notify.info("Too many matches found. Please enter a more specific name.");
        }else if(country.length >= 2 && country.length <= 10){
            refs.infoCountry.classList.add('is-hidden');  
            return makeMarkupCountryList(country);
        } else{
            refs.listCountry.classList.add('is-hidden');
            return renderCountryCard(country[0]);}
    })
    .catch(error=>{
        refs.infoCountry.classList.add('is-hidden');
        refs.listCountry.classList.add('is-hidden');
        Notify.failure("Oops, there is no country with that name");
    })
}
    
function makeMarkupCountry({name, capital,population,flags,languages}){
  
    refs.infoCountry.classList.remove('is-hidden'); 
    return  `<h2 class="country">${name.official}</h2>
            <img src="${flags.svg}" alt="flag" width = 50px>
            <p class="info-country">Capital: ${capital}</p>
            <p class="info-country">Population: ${population}</p>
            <p class="info-country">Languages: ${Object.values(languages)}</p>`
}
function renderCountryCard(country){
    const markup = makeMarkupCountry(country);
    refs.infoCountry.innerHTML = markup;
}


function makeMarkupCountryList(country){
    refs.listCountry.classList.remove('is-hidden');
    const markup = country.map((contr) =>
            `<li>
            <img class ="img-flag" src="${contr.flags.svg}" alt="flag" width = 50px>${contr.name.common}
            </li> `)
            .join("");
    return refs.listCountry.innerHTML = markup; 
};
     
        


export { fetchCountryByName, makeMarkupCountry,renderCountryCard,makeMarkupCountryList};