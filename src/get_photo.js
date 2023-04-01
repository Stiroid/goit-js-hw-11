import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34779436-d80b9ac3ac8a63557a918f5f0';
export default class NewsApiService {
  constructor() {
    this.inputValue = '';
    this.page = 0;
  }
  
  async fetchArticles() {
    
      
      try {
          // console.log(this)
          // console.log(this.page)
          const url = `?key=${API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
          const response = await axios.get(url);
        //   const data = await response.json();
          console.log(response);
          this.incrementPage();
        return response.data;
    }

    catch (error) {
        console.error(error);
    }

  }
    
  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value(){
    return this.inputValue;
  }

  set value(newValue) {
    this.inputValue = newValue;
  }
}