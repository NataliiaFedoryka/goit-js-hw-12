import{a as y,i as c,S as g}from"./assets/vendor-c493984e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();function p(o){return document.querySelector(".images-list"),o.map(a=>`<li class="images-list-item">
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
    </li>`).join("")}const L="44528758-32c26e02cbc7bd56fd7d9b89c",w="https://pixabay.com/api/";async function h(o,i=1){const a={key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:15};try{return(await y.get(w,{params:a})).data}catch{throw new Error("Fetch request failed")}}const e={imageSearchForm:document.querySelector(".search-form"),imageSearchInput:document.querySelector(".search-input"),submitButton:document.querySelector(".search-btn"),imageList:document.querySelector(".images-list"),loadMoreButton:document.querySelector(".load-more"),loader:document.getElementById("loader")};e.loadMoreButton.classList.add("hidden");let n,d="",l=1,m=0;const f=15;e.imageSearchForm.addEventListener("submit",async o=>{if(o.preventDefault(),d=e.imageSearchInput.value.trim(),d==="")return e.imageList.innerHTML="",c.info({message:"You need to enter a search request!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"});e.loader.classList.remove("hidden"),e.loadMoreButton.classList.add("hidden"),l=1;try{const i=await h(d,l),{hits:a,total:r}=i;if(m=r,a.length===0)e.imageList.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"});else{e.imageList.innerHTML="";const t=p(a);e.imageList.insertAdjacentHTML("beforeend",t),n?n.refresh():n=new g(".images-list-item a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0})}l*f<m?e.loadMoreButton.classList.remove("hidden"):e.loadMoreButton.classList.add("hidden")}catch(i){console.error("Error fetching images",i),c.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{e.loader.classList.add("hidden"),o.target.reset()}});e.loadMoreButton.addEventListener("click",async()=>{l+=1,e.loadMoreButton.textContent="Loading images, please wait...",e.loader.classList.remove("hidden"),e.loadMoreButton.classList.add("hidden");try{const o=await h(d,l),{hits:i,total:a}=o;if(m=a,i.length===0)e.imageList.innerHTML="",c.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"});else{const r=p(i);e.imageList.insertAdjacentHTML("beforeend",r),n?n.refresh():n=new g(".images-list-item a ",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0})}l*f<m?e.loadMoreButton.classList.remove("hidden"):e.loadMoreButton.classList.add("hidden")}catch(o){console.error("Error fetching images",o),c.error({message:"Something went wrong. Please try again later!",position:"topRight",transitionIn:"bounceInDown",transitionOut:"fadeOutDown"})}finally{e.loader.classList.add("hidden"),e.loadMoreButton.textContent="Load more"}});
//# sourceMappingURL=commonHelpers.js.map
