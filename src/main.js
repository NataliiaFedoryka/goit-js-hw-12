'use strict';

// import './css/styles.css';
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

// refs.loader.classList.add('hidden');
refs.loadMoreButton.classList.add('hidden');

let lightbox;
let request = "";
let page = 1;
let totalHits = 0; 


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
        const { data } = await fetchImages(request, page);
        const { hits, total } = data;

         totalHits = total; 
        if (hits.length === 0) {
            refs.imageList.innerHTML = '';
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutDown',
            });
        } else {
            renderImages(hits);

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
             refs.loadMoreButton.classList.add('hidden');
        }
        refs.loader.classList.add('hidden');

        // Check if end of collection is reached
        if (page * 15 >= totalHits) {
            refs.loadMoreButton.classList.add('hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutDown',
            });
        } else {
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
    refs.loadMoreButton.textContent = "Loading images, please wait...";
    refs.loader.classList.remove('hidden');
    refs.loadMoreButton.classList.add('hidden');

    try {
        const { data } = await fetchImages(request, page);
        const { hits, total } = data;
        totalHits = total;
        if (hits.length === 0) {
            refs.imageList.innerHTML = '';
            iziToast.error({
                message: 'Something went wrong. Please try again later!',
                position: 'topRight',
                transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutDown',
        });

        }
        else {renderImages(hits);
        if (lightbox) {
             lightbox.refresh();
        }
        else {
            lightbox = new SimpleLightbox('.images-list-item a ', {
                aptions: true,
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
       refs.loader.classList.add('hidden');

        // Check if end of collection is reached
        if (page * 15 >= totalHits) {
            refs.loadMoreButton.classList.add('hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',

transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutDown',
            });
        } else {
            refs.loadMoreButton.classList.remove('hidden');
            
         }} }
     catch (err) {
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
        });
    } finally {
        refs.loader.classList.add('hidden');
        refs.loadMoreButton.textContent = "Load more";
    }
});