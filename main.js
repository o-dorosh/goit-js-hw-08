import galleryItems from "./gallery-items.js";

const imgContainer = document.querySelector('.js-gallery');

const cardsMarkup = createImgCardsMarkup(galleryItems);

imgContainer.insertAdjacentHTML('beforeend', cardsMarkup);

imgContainer.addEventListener('click', onImgContainerClick);

const lightbox = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const lightboxImg = document.querySelector('.lightbox__image');
const CloseBtn = document.querySelector('.lightbox__button');

CloseBtn.addEventListener('click', onCloseModalBtn);

overlay.addEventListener('click', onCloseModalBtn);

window.addEventListener('keydown',  onCloseBtnEsc);

// window.addEventListener('keydown',  onImgChange);

function createImgCardsMarkup (galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
    }).join('');
  };

function onImgContainerClick(event){
    event.preventDefault();

    if(!event.target.classList.contains('gallery__image')) {
        return;
    };  

    lightbox.classList.add('is-open');
    lightboxImg.src = event.target.dataset.source;
    lightboxImg.alt = event.target.alt;
}; 

function onCloseModalBtn(event) {
    lightbox.classList.remove('is-open');
    lightboxImg.setAttribute('src', "");
    lightboxImg.setAttribute('alt', "");
};

function onCloseBtnEsc(event) {
    if(event.code === 'Escape'){
        onCloseModalBtn(event);
    }
};
