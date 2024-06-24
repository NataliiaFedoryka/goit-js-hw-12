import axios from 'axios';



import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderImages, clearGallery } from "./js/render-functions.js";
import { fetchImages } from "./js/pixabay-api.js";

const refs = {
    imageSearchForm: document.querySelector('.search-form'),
    imageSearchInput: document.querySelector('.search-input'),
    submitButton: document.querySelector('.search-btn'),
    imageList: document.querySelector('.images-list'),
    loader: document.getElementById('loader'), // Updated to correct the selector
}

refs.loader.classList.add('hidden');

let lightbox;
let request;

refs.imageSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    request = refs.imageSearchInput.value.trim();

    if (request === '') {
        refs.imageList.innerHTML = '';
        return iziToast.info({
            message: 'You need to enter a search request!',
            position: 'topRight',
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
        });
    }

    refs.loader.classList.remove('hidden');
    clearGallery();

    try {
        const images = await fetchImages(request);
        if (images.hits.length === 0) {
            refs.imageList.innerHTML = '';
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutDown',
            });
        } else {
            renderImages(images.hits);

            if (lightbox) {
                lightbox.refresh();
            } else {
                lightbox = new SimpleLightbox('.images-list-item a', {
                    captions: true,
                    captionSelector: 'img',
                    captionType: 'attr',
                    captionsData: 'alt',
                    captionPosition: 'bottom',
                    captionDelay: 250,
                    animationSpeed: 300,
                    widthRatio: 1,
                    heightRatio: 0.95,
                    disableRightClick: true,
                });
            }
        }
    } catch (err) {
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
        });
    } finally {
        refs.loader.classList.add('hidden');
        e.target.reset();
    }
});