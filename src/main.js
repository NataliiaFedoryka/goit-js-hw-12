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
    loadMoreButton: document.querySelector('.load-more'),

    loader: document.getElementById('loader'), }

refs.loader.classList.add('hidden');
refs.loadMoreButton.classList.add('hidden');

let lightbox;
let request = "";
let page = 1;


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
    refs.loadMoreButton.classList.add('hidden');

    clearGallery();
    page = 1;

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
            refs.loadMoreButton.classList.remove('hidden');

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
refs.loadMoreButton.addEventListener('click', async () => {
    page += 1;
    refs.loader.classList.remove('hidden');
    refs.loadMoreButton.classList.add('hidden');

    try {
        const images = await fetchImages(request, page);
        renderImages(images.hits);
        lightbox.refresh();
        refs.loadMoreButton.classList.remove('hidden');
    } catch (err) {
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
        });
    } finally {
        refs.loader.classList.add('hidden');
    }
});