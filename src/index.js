import NewLoadApi from './fetch';

const axios = require('axios');
 const refs={
    form: document.querySelector('#search-form'),
    inputSearch: document.querySelector('[name = searchQuery]'),
    gallery: document.querySelector('.gallery'),
}

const newsLoadApi = new NewLoadApi();

refs.form.addEventListener('submit', onSearch)

function onSearch(e){
    e.preventDefault()
    if(refs.inputSearch.value ===''){
        return console.log('error')
       }
    newsLoadApi.animals = refs.inputSearch.value;
    newsLoadApi.resetPage();
    newsLoadApi.getFetch().then(response => markupFetch (response));
    
    
  
}

 


function markupFetch (e){

  const markup = 
  e.data.hits.map((animals)=> 
   ` <div class="photo-card" width = 200 height = 200>
    <img class ="animal-photo"src="${animals.webformatURL}" alt="${animals.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${animals.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${animals.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${animals.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${animals.downloads}</b>
      </p>
    </div>
  </div>`).join('')
  return refs.gallery.insertAdjacentHTML('beforeend', markup)
}

