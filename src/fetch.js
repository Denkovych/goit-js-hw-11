const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class NewLoadApi{
    
    constructor(){
        this.searchAnimals = '';
        this.NUMBER_PAGE = 1;
    }
    
 async  getFetch() {
    const URL = 'https://pixabay.com/api/?key=28047035-46c6d566ba725b6a4d4d91850&';
    try {
    const response = await axios.get(`${URL}q=${this.searchAnimals}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.NUMBER_PAGE}&per_page=40`);
     
    return response;
    } catch (error) {
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  }



 incrementPage (){
    this.NUMBER_PAGE+=1
 } 

 resetPage(){
    this.NUMBER_PAGE = 1
 }

 get animals(){
    return this.searchAnimals;
 }
 set animals(newAnimal){
    this.searchAnimals = newAnimal;
 }

}

