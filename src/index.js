import  NewsApiService  from './get_photo';
import LoadMoreBtn from './load_more_btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let lightbox = new SimpleLightbox('.gallery a', { /* options */ });

const loadMoreBtn = new LoadMoreBtn({
  selector: ('.btn-primary'),
  hidden:true,
})

const newsApiService = new NewsApiService()
const formEl = document.querySelector("#search-form");
const galleryEl = document.querySelector(".gallery")
formEl.addEventListener("submit", submitFormEvtHandler);

loadMoreBtn.refs.button.addEventListener("click", onLoadMore);
console.log(newsApiService.page)

async function submitFormEvtHandler(evt) {
  console.log(newsApiService.page)

  evt.preventDefault();
  newsApiService.resetPage() 
  newsApiService.value  = evt.currentTarget.elements.searchQuery.value;

  if(newsApiService.value.trim() === ''){
    Notify.failure("Empty, request!");
  }else{
    console.log(newsApiService.page)
   const newData =  await newsApiService.fetchArticles();
console.log(newData);
    console.log(newsApiService.page)
      deleteMarkup();
      renderMarkup(newData.hits);
      lightbox.refresh();

      if(newData.totalHits !== 0){
        Notify.success(`"Hooray! We found ${newData.totalHits} images."`);
      }

      if((Math.ceil(newData.totalHits/40)+1) <= newsApiService.page){
        loadMoreBtn.hide();
      }else{
        loadMoreBtn.show();
        loadMoreBtn.enable();
      }
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();

  console.log(newsApiService.page)

  const newData = await newsApiService.fetchArticles();
    renderMarkup(newData.hits);
    lightbox.refresh();
    loadMoreBtn.enable();
  }


function  deleteMarkup() {
  galleryEl.innerHTML ='';
}

function renderMarkup(data) {
 if (data.length === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    loadMoreBtn.hide();
  } else {
    galleryEl.insertAdjacentHTML("beforeend", renderImgGallery(data));
  }
}

function renderImgGallery(images) {

  console.log(newsApiService.page)

  if(images.length < 40 && newsApiService.page !== 2){
    Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
  }

  const markup = images

  return markup
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        ` 
          <a class="gallery__link-item" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                    ${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                    ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                    ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                    ${downloads}
                </p>
              </div>
            </div>
          </a>
        `
      )
    .join("");
  }