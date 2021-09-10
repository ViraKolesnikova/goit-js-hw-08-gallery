import galleryItems from "./galleryItems.js"

const galleryList = document.querySelector('.js-gallery');
const galleryImages = document.querySelectorAll('.gallery__image');
const modalWindow = document.querySelector('div.lightbox');
const modalImage = document.querySelector('.lightbox__image')
const modalCloseBtn = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');


galleryList.addEventListener('click', onGalleryItemClick);
modalCloseBtn.addEventListener('click', onCloseBtnClick);
overlay.addEventListener('click', onOverlayClickCloseModal);


const rightBtn = addSliderBtnRight();
const leftBtn = addSliderBtnLeft();
modalWindow.insertAdjacentHTML('beforeend', rightBtn);
modalWindow.insertAdjacentHTML('afterbegin', leftBtn);

const sliderBtnLeft = document.querySelector('[data-action = "left"]');
const sliderBtnRight = document.querySelector('[data-action = "right"]');

sliderBtnLeft.addEventListener('click', onLeftBtnClick);
sliderBtnRight.addEventListener('click', onRightBtnClick);

function makeGalleryItems(items) {
  const galleryNewItems = items.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href = "${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></li>`
  }).join('');
  galleryList.insertAdjacentHTML('afterbegin', galleryNewItems);
}

makeGalleryItems(galleryItems);

function onGalleryItemClick(event) {
  event.preventDefault();
  const image = event.target;
  if (!image.classList.contains('gallery__image')) {
    return;
  }  
  openModalWindow(image);
}

function openModalWindow(item) {
  window.addEventListener('keydown', onEscPressOut);

  modalWindow.classList.add('is-open');
  modalImage.src = item.dataset.source;
  modalImage.alt = item.alt;

  addSliderBtnLeft();
}

function onCloseBtnClick(event) {
  window.removeEventListener('keydown', onEscPressOut);

  modalWindow.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}

function onOverlayClickCloseModal(event) {
  modalWindow.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}

function onEscPressOut(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

function addSliderBtnRight() {
  const rightBtn = '<button type="button" class="lightbox__right-button" data-action="right"></button>';
  return rightBtn;
}


function addSliderBtnLeft() {
  const leftBtn = '<button type="button" class="lightbox__left-button" data-action="left"></button>'
  return leftBtn;
}

  
function onRightBtnClick(event) {
  for (let i = 0; i < galleryItems.length; i += 1){
    if (modalImage.src === galleryItems[i].original) {
      let nextImageIndex = i + 1;
      if (nextImageIndex > galleryItems.length-1) {
        nextImageIndex = 0;        
      }
      modalImage.src = galleryItems[nextImageIndex].original;
      return
    };
    
  }
}

function onLeftBtnClick(event) {
   for (let i = 0; i < galleryItems.length; i += 1){
    if (modalImage.src === galleryItems[i].original) {
      let nextImageIndex = i - 1;
      if (nextImageIndex < 0) {
        nextImageIndex = galleryItems.length-1;        
      }
      modalImage.src = galleryItems[nextImageIndex].original;
      return
    };    
  }
}
