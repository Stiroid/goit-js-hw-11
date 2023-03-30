const BACK_END_URL =  'https://pixabay.com/api/'
const API_KEY = '34779436-d80b9ac3ac8a63557a918f5f0'

export default class NewsApiService {
  constructor() {
    this.inputValue = '';
    this.page = 0;
  }
  
  async fetchArticles() {
    console.log(this)
    console.log(this.page)
    const url = `${BACK_END_URL}/?key=${API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.incrementPage();
    return data;
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