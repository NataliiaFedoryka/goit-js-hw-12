import{a as f,i as r,S as g}from"./assets/vendor-c493984e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function p(o){const i={imageList:document.querySelector(".images-list")},n=o.map(a=>`<li class="images-list-item">
      <a class="img-link" href="${a.largeImageURL}">
        <img class="img" src="${a.webformatURL}" alt="${a.tags}" />
      </a>
      <ul class="img-dscr">
        <li class="img-data">
          <p class="img-data-title">Likes</p>
          <p class="img-data-numbers">${a.likes}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Views</p>
          <p class="img-data-numbers">${a.views}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Comments</p>
          <p class="img-data-numbers">${a.comments}</p>
        </li>
        <li class="img-data">
          <p class="img-data-title">Downloads</p>
          <p class="img-data-numbers">${a.downloads}</p>
        </li>
      </ul>
    </li>`).join("");i.imageList.innerHTML+=n}function y(){const o={imageList:document.querySelector(".images-list")};o.imageList.innerHTML=""}const L="44528758-32c26e02cbc7bd56fd7d9b89c",w="https://pixabay.com/api/";async function h(o,i=1){const n={key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:15};try{return(await f.get(w,{params:n})).data}catch{throw new Error("Fetch request failed")}}const e={imageSearchForm:document.querySelector(".search-form"),imageSearchInput:document.querySelector(".search-input"),submitButton:document.querySelector(".search-btn"),imageList:document.querySelector(".images-list"),loadMoreButton:document.querySelector(".load-more"),loader:document.getElementById("loader")};e.loadMoreButton.classList.add("hidden");let l,d="",c=1,u=0;e.imageSearchForm.addEventListener("submit",async o=>{if(o.preventDefault(),d=e.imageSearchInput.value.trim(),d==="")return e.imageList.innerHTML="",r.info({message:"You need to enter a search request!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"});e.loader.classList.remove("hidden"),e.loadMoreButton.classList.add("hidden"),y(),c=1;try{const{data:i}=await h(d,c),{hits:n,total:a}=i;u=a,n.length===0?(e.imageList.innerHTML="",r.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})):(p(n),l?l.refresh():l=new g(".images-list-item a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0}),e.loadMoreButton.classList.add("hidden")),e.loader.classList.add("hidden"),c*15>=u?(e.loadMoreButton.classList.add("hidden"),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})):e.loadMoreButton.classList.remove("hidden")}catch{r.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{e.loader.classList.add("hidden"),o.target.reset()}});e.loadMoreButton.addEventListener("click",async()=>{c+=1,e.loadMoreButton.textContent="Loading images, please wait...",e.loader.classList.remove("hidden"),e.loadMoreButton.classList.add("hidden");try{const{data:o}=await h(d,c),{hits:i,total:n}=o;u=n,i.length===0?(e.imageList.innerHTML="",r.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})):(p(i),l?l.refresh():l=new g(".images-list-item a ",{aptions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0}),e.loader.classList.add("hidden"),c*15>=u?(e.loadMoreButton.classList.add("hidden"),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})):e.loadMoreButton.classList.remove("hidden"))}catch{r.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{e.loader.classList.add("hidden"),e.loadMoreButton.textContent="Load more"}});
//# sourceMappingURL=commonHelpers.js.map
