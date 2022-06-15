import NewLoadApi from './fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios');
 
const refs={
    form: document.querySelector('#search-form'),
    inputSearch: document.querySelector('[name = searchQuery]'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    photoCard: document.querySelector('.photo-card')
}

const newsLoadApi = new NewLoadApi();

refs.form.addEventListener('submit', onSearch)
refs.btnLoadMore.addEventListener('click', onLoadMore)
refs.photoCard.addEventListener('click', onClickImage )

function onSearch(e){
    e.preventDefault()
    if(refs.inputSearch.value ===''){
        return console.log('error')
       }
    clearGallery();
    newsLoadApi.animals = refs.inputSearch.value;
    newsLoadApi.resetPage();
    refs.btnLoadMore.classList.remove('is-hidden')
    newsLoadApi.getFetch().then(response => markupFetch (response));
    
    
}

function onLoadMore(){
  newsLoadApi.incrementPage();
  newsLoadApi.getFetch().then(response => markupFetch (response));
}
 


function markupFetch (e){
  if(e.data.totalHits === 0){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    refs.btnLoadMore.classList.add('is-hidden')
  }
  Notify.success(`Hooray! We found ${e.data.totalHits} images.`);
  const markup = 
  e.data.hits.map((animals)=> 
   ` <div class="photo-card" width = 200 height = 200>
    <a href ="${animals.largeImageURL}">
    <img class ="animal-photo"src="${animals.webformatURL}" alt="${animals.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes:<br>${animals.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:<br>${animals.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:<br>${animals.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:<br>${animals.downloads}</b>
      </p>
    </div>
  </div>`).join('')
  return refs.gallery.insertAdjacentHTML('beforeend', markup)
}


function clearGallery(){
  refs.gallery.innerHTML ='';
}

function onClickImage(e){
  e.preventDefault();
  var lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 })
}