import{a as p,i as n,S as h}from"./assets/vendor-b0d10f48.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function u(s){const a={imageList:document.querySelector(".images-list")},o=s.map(i=>`<li class="images-list-item">
      <a class="img-link" href="${i.largeImageURL}">
        <img class="img" src="${i.webformatURL}" alt="${i.tags}" />
      </a>
      <ul class="img-dscr">
        <li class="img-data">
          <p class="img-data-title">Likes</p>
          <p class="img-data-numbers">${i.likes}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Views</p>
          <p class="img-data-numbers">${i.views}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Comments</p>
          <p class="img-data-numbers">${i.comments}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Downloads</p>
          <p class="img-data-numbers">${i.downloads}</p>
        </li>
      </ul>
    </li>`).join("");a.imageList.innerHTML+=o}function f(){const s={imageList:document.querySelector(".images-list")};s.imageList.innerHTML=""}const y="44528758-32c26e02cbc7bd56fd7d9b89c",L="https://pixabay.com/api/";async function g(s,a=1){const o={key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15};try{return(await p.get(L,{params:o})).data}catch{throw new Error("Fetch request failed")}}const t={imageSearchForm:document.querySelector(".search-form"),imageSearchInput:document.querySelector(".search-input"),submitButton:document.querySelector(".search-btn"),imageList:document.querySelector(".images-list"),loadMoreButton:document.querySelector(".load-more"),loader:document.getElementById("loader")};t.loader.classList.add("hidden");t.loadMoreButton.classList.add("hidden");let c,l="",m=1;t.imageSearchForm.addEventListener("submit",async s=>{if(s.preventDefault(),l=t.imageSearchInput.value.trim(),l==="")return t.imageList.innerHTML="",n.info({message:"You need to enter a search request!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"});t.loader.classList.remove("hidden"),t.loadMoreButton.classList.add("hidden"),f(),m=1;try{const a=await g(l);a.hits.length===0?(t.imageList.innerHTML="",n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})):(u(a.hits),c?c.refresh():c=new h(".images-list-item a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0}),t.loadMoreButton.classList.remove("hidden"))}catch{n.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{t.loader.classList.add("hidden"),s.target.reset()}});t.loadMoreButton.addEventListener("click",async()=>{m+=1,t.loader.classList.remove("hidden"),t.loadMoreButton.classList.add("hidden");try{const s=await g(l,m);u(s.hits),c.refresh(),t.loadMoreButton.classList.remove("hidden")}catch{n.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{t.loader.classList.add("hidden")}});
//# sourceMappingURL=commonHelpers.js.map
