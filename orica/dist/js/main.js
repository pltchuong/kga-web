"use strict";function e(){document.getElementById("preloader")&&setTimeout((()=>{document.getElementById("preloader").style.visibility="hidden"}),800)}function t(){const e=document.querySelector(".cookie-popup");if(e){const t=e.querySelector(".cookie-popup-actions .accept-cookie");declineBtn=e.querySelector(".cookie-popup-actions .decline-cookie"),t.addEventListener("click",(()=>{document.cookie="orica_cookie=agree; max-age=2592000",document.cookie&&e.classList.add("hide")})),declineBtn.addEventListener("click",(()=>{document.cookie="orica_cookie=agree; max-age=2592000",document.cookie&&e.classList.add("hide")})),-1!=document.cookie.indexOf("orica_cookie=agree")?e.classList.add("hide"):e.classList.remove("hide")}}function o(){const e=document.querySelector(".site-cursor");document.body.querySelectorAll("[data-hoverable='true']").forEach((function(t){t.addEventListener("mouseenter",(o=>{const s=t.getAttribute("data-cursor-text");let n='<span class="site-cursor-text is-hidden">'+(s||"Discover")+"</span>";e.innerHTML=n;const i=document.querySelector(".site-cursor-text");e.classList.add("large"),setTimeout((()=>{i.classList.add("is-visible")}),200)})),t.addEventListener("mouseleave",(t=>{e.classList.remove("large"),e.innerHTML=""}))}))}function s(e){const t=document.querySelector(".site-cursor");if($(".site-cursor.large").length?$(".site-cursor.large").css({left:e.clientX-30,top:e.clientY-30}):$(".site-cursor").css({left:e.clientX-9,top:e.clientY-9}),window.IntersectionObserver){new IntersectionObserver((function(e,o){e.forEach((e=>{e.isIntersecting?t.classList.remove("small"):t.classList.add("small")}))}),{root:null,rootMargin:"-30px",threshold:.1}).observe(t)}}window.addEventListener("load",e,!1),window.addEventListener("load",t,!1),o(),document.body.addEventListener("mousemove",s),document.querySelectorAll(".navbar a").forEach((function(e){const t=document.querySelector(".site-cursor");e.addEventListener("mouseenter",(e=>{t.classList.add("link"),setTimeout((()=>{t.classList.add("is-visible")}),200)})),e.addEventListener("mouseleave",(e=>{t.classList.remove("link")}))})),history.scrollRestoration?history.scrollRestoration="manual":window.onbeforeunload=function(){window.scrollTo(0,0)};const n=document.querySelector(".scroll-btn-down");n&&window.addEventListener("scroll",(e=>{const t=$(window).scrollTop()/($(document).height()-$(window).height());n.style.setProperty("--scroll-down-progress",t)})),window.onload=function(){n.classList.add("active")},n.addEventListener("click",(()=>{const e=i();$(e).next("[data-scroll-section='true']")[0]&&$(e).next("[data-scroll-section='true']")[0].scrollIntoView()}));const i=()=>{const e=document.querySelectorAll("[data-scroll-section='true']");let t=!1;if(e.length)for(const[o,s]of e.entries())a(s)&&(t=s);return t},a=(e,t,o)=>{t=t||0,o=o||"visible";const s=e.getBoundingClientRect(),n=Math.max(document.documentElement.clientHeight,window.innerHeight),i=s.bottom-t<0,a=s.top-n+t>=0;return"above"===o?i:"below"===o?a:!i&&!a},r=document.querySelector(".scroll-btn-up");r&&(window.addEventListener("scroll",(e=>{const t=$(window).scrollTop()/($(document).height()-$(window).height());r&&(r.style.setProperty("--scroll-up-progress",t),document.body.scrollTop>200||document.documentElement.scrollTop>200?r.classList.add("active"):r.classList.remove("active"))})),r.addEventListener("click",(()=>{window.scroll({top:0,behavior:"smooth"})})));const c=document.querySelector('[data-offcanvas-toggle="offcanvas"]'),l=document.querySelector(".offcanvas-collapse"),d=document.querySelector(".offcanvas-close"),u=document.querySelector(".navbar-hamburger");c&&c.addEventListener("click",(e=>{e.stopPropagation(),l.classList.toggle("open"),u.classList.toggle("open"),m()})),d&&d.addEventListener("click",(e=>{e.stopPropagation(),l.classList.remove("open"),u.classList.remove("open"),m()}));const m=()=>{if(l.classList.contains("open")){const e=document.createElement("div");e.className="offcanvas-collapse-backdrop offcanvas-backdrop fade show",document.body.appendChild(e),e.addEventListener("click",(e=>{e.stopPropagation(),l.classList.remove("open"),u.classList.remove("open"),m()}))}else{document.querySelector(".offcanvas-collapse-backdrop").remove()}},p=window.counterUp.default,f=document.getElementsByClassName("counter");if(f.length&&void 0!==p)for(let e=0;e<f.length;e++){const t=f[e];new Waypoint({element:t,handler:function(){p(t,{duration:1e3,delay:40}),this.destroy()},offset:"bottom-in-view"})}const g=document.getElementsByClassName("progressbar");if(g.length&&"undefined"!=typeof ProgressBar)for(let e=0;e<g.length;e++){const t=g[e],o=t.getAttribute("data-value")||100;new ProgressBar.Line(t,{strokeWidth:3,easing:"easeInOut",duration:3e3,trailWidth:3,text:{className:"progressbar-counter",style:null},step:(e,t)=>{t.setText(Math.round(100*t.value())+" %")}}).animate(o/100)}if(document.querySelectorAll(".js-player").length&&"undefined"!=typeof Plyr){Array.from(document.querySelectorAll(".js-player")).map((e=>new Plyr(e)))}$(".portfolio-grid").each(((e,t)=>{const o=$(t),s=$(t).closest(".section").find(".portfolio-filter"),n=o.find(".isotope").imagesLoaded((()=>{n.isotope({itemSelector:".grid-item",layoutMode:"masonry",percentPosition:!0,masonry:{columnWidth:n.width()/12},transitionDuration:"0.5s"})}));$(window).on("resize",(()=>{n.isotope({masonry:{columnWidth:n.width()/12}})})),$(window).on("load",(()=>{n.isotope({masonry:{columnWidth:n.width()/12}})})),s.on("click","a",(function(){var e=$(this).attr("data-filter");n.isotope({filter:e})}))}));const w=document.getElementsByClassName("orica-carousel");if(w.length&&"undefined"!=typeof Swiper)for(let e=0;e<w.length;e++){const t=w[e].getElementsByClassName("swiper-container")[0];let s=t.getAttribute("data-swiper")||null;const n={loop:!0,paginationClickable:!0,pauseOnMouseEnter:!0,autoplay:{delay:5e3},speed:1e3,breakpoints:{0:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:32},1400:{slidesPerView:3,spaceBetween:32}},on:{init:function(){o()}}};s=JSON.parse(s);const i=Object.assign({},n,s);new Swiper(t,i)}const v=document.getElementsByClassName("orica-custom-carousel");if(v.length&&"undefined"!=typeof Swiper)for(let e=0;e<v.length;e++){const t=v[e],s=t.getElementsByClassName("swiper-container")[0],n=t.getElementsByClassName("carousel-nav-next")[0],i=t.getElementsByClassName("carousel-nav-prev")[0],a=t.getElementsByClassName("carousel-counter")[0];let r=s.getAttribute("data-swiper")||null;const c={loop:!0,paginationClickable:!0,pauseOnMouseEnter:!0,autoplay:{delay:5e3},speed:1e3,pagination:{el:a,type:"custom",renderCustom:function(e,t,o){return'<span class="counter-current">'+t+'</span><span class="line-divider"></span><span class="counter-total">'+o+"</span>"}},navigation:{nextEl:n,prevEl:i},breakpoints:{0:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:32},1400:{slidesPerView:3,spaceBetween:32}},on:{init:function(){o()}}};r=JSON.parse(r);const l=Object.assign({},c,r);new Swiper(s,l)}$("#contact-form").on("submit",(function(e){e.preventDefault();return $.ajax({type:"POST",url:"php/contact.php",data:$(this).serialize(),success:function(e){var t="alert-"+e.status,o=e.message,s='<div class="alert '+t+' alert-dismissible fade show mb-4" role="alert">'+o+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';t&&o&&($("#contact-form").find(".messages").html(s),$("#contact-form")[0].reset())}}),!1}));