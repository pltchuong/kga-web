"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*--------------------------------------*/

/*	PRELOADER
/*--------------------------------------*/
window.addEventListener("load", preloader, false); // Preloader animation show/hide

function preloader() {
  if (document.getElementById("preloader")) {
    setTimeout(function () {
      document.getElementById("preloader").style.visibility = "hidden";
    }, 800);
  }
}
/*--------------------------------------*/

/*	COOKIES
/*--------------------------------------*/


window.addEventListener("load", cookiePopup, false); // Cookie popup Show/Hide

function cookiePopup() {
  var cookiePopup = document.querySelector(".cookie-popup");

  if (cookiePopup) {
    var agreeBtn = cookiePopup.querySelector(".cookie-popup-actions .accept-cookie");
    declineBtn = cookiePopup.querySelector(".cookie-popup-actions .decline-cookie"); // Agree btn cookie setup (replace orica_cookie with your value)

    agreeBtn.addEventListener("click", function () {
      document.cookie = "orica_cookie=agree; max-age=" + 60 * 60 * 24 * 30;

      if (document.cookie) {
        cookiePopup.classList.add("hide");
      }
    }); // Decline btn cookie setup (replace orica_cookie with your value)

    declineBtn.addEventListener("click", function () {
      document.cookie = "orica_cookie=agree; max-age=" + 60 * 60 * 24 * 30;

      if (document.cookie) {
        cookiePopup.classList.add("hide");
      }
    }); // Check cookie

    var checkCookie = document.cookie.indexOf("orica_cookie=agree");
    checkCookie != -1 ? cookiePopup.classList.add("hide") : cookiePopup.classList.remove("hide");
  }
}
/*--------------------------------------*/

/*	CURSOR
/*--------------------------------------*/


customCursor(); // Handle cursor on mousemove

document.body.addEventListener("mousemove", onMouseMove);

function customCursor() {
  var $siteCursor = document.querySelector(".site-cursor"); // Default cursor text

  var $siteCursorText = "Discover"; // Handle hoverable elements

  document.body.querySelectorAll("[data-hoverable='true']").forEach(function (el) {
    // Add Mouseover Listener
    el.addEventListener("mouseenter", function (e) {
      var $cursorTextAttribute = el.getAttribute("data-cursor-text");
      var $cursorText = $cursorTextAttribute ? $cursorTextAttribute : $siteCursorText;
      var $siteCursorHTML = '<span class="site-cursor-text is-hidden">' + $cursorText + "</span>";
      $siteCursor.innerHTML = $siteCursorHTML;
      var $cursorTextHolder = document.querySelector(".site-cursor-text");
      $siteCursor.classList.add("large");
      setTimeout(function () {
        $cursorTextHolder.classList.add("is-visible");
      }, 200);
    }); // Add Mouseleave Listener

    el.addEventListener("mouseleave", function (e) {
      $siteCursor.classList.remove("large");
      $siteCursor.innerHTML = "";
    });
  });
} // Handle hoverable navbar links


document.querySelectorAll(".navbar a").forEach(function (el) {
  var $siteCursor = document.querySelector(".site-cursor"); // Add Mouseover Listener

  el.addEventListener("mouseenter", function (e) {
    $siteCursor.classList.add("link");
    setTimeout(function () {
      $siteCursor.classList.add("is-visible");
    }, 200);
  }); // Add Mouseleave Listener

  el.addEventListener("mouseleave", function (e) {
    $siteCursor.classList.remove("link");
  });
}); // Handle the cursor position on move

function onMouseMove(e) {
  var $siteCursor = document.querySelector(".site-cursor");

  if ($(".site-cursor.large").length) {
    $(".site-cursor.large").css({
      left: e.clientX - 30,
      top: e.clientY - 30
    });
  } else {
    $(".site-cursor").css({
      left: e.clientX - 9,
      top: e.clientY - 9
    });
  }

  if (!!window.IntersectionObserver) {
    var options = {
      root: null,
      rootMargin: "-30px",
      threshold: 0.1
    };

    var callback = function callback(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $siteCursor.classList.remove("small");
        } else {
          $siteCursor.classList.add("small");
        }
      });
    };

    var observer = new IntersectionObserver(callback, options);
    observer.observe($siteCursor);
  }
}
/*--------------------------------------*/

/*	SCROLL DOWN BUTTON
/*--------------------------------------*/
// Set Scroll position to Top on page reload


if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
} // Scroll down btn


var scrollBtnDown = document.querySelector(".scroll-btn-down");

if (scrollBtnDown) {
  // Handle button animation on scroll
  window.addEventListener("scroll", function (e) {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var scrolled = scroll / height;
    scrollBtnDown.style.setProperty("--scroll-down-progress", scrolled);
  });
} // Show btn on load


window.onload = function () {
  scrollBtnDown.classList.add("active");
}; // Handle Scroll button  click


scrollBtnDown.addEventListener("click", function () {
  var visibleSection = findVisibleSection();

  if ($(visibleSection).next("[data-scroll-section='true']")[0]) {
    $(visibleSection).next("[data-scroll-section='true']")[0].scrollIntoView();
  }
}); // Find current visible section

var findVisibleSection = function findVisibleSection() {
  var scetionsArray = document.querySelectorAll("[data-scroll-section='true']");
  var visibleElem = false;

  if (scetionsArray.length) {
    var _iterator = _createForOfIteratorHelper(scetionsArray.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            i = _step$value[0],
            elem = _step$value[1];

        if (checkVisible(elem)) {
          visibleElem = elem;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return visibleElem;
}; // Checks is element visible


var checkVisible = function checkVisible(elem, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || "visible";
  var rect = elem.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var above = rect.bottom - threshold < 0;
  var below = rect.top - viewHeight + threshold >= 0;
  return mode === "above" ? above : mode === "below" ? below : !above && !below;
};
/*--------------------------------------*/

/*	SCROLL TO TOP BUTTON
/*--------------------------------------*/


var scrollBtnUp = document.querySelector(".scroll-btn-up");

if (scrollBtnUp) {
  window.addEventListener("scroll", function (e) {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var scrolled = scroll / height;

    if (scrollBtnUp) {
      scrollBtnUp.style.setProperty("--scroll-up-progress", scrolled);

      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtnUp.classList.add("active");
      } else {
        scrollBtnUp.classList.remove("active");
      }
    }
  });
  scrollBtnUp.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  });
}
/*--------------------------------------*/

/*	OFFCANVAS MENU
/*--------------------------------------*/


var offcanvasToggle = document.querySelector('[data-offcanvas-toggle="offcanvas"]');
var offcanvasCollapse = document.querySelector(".offcanvas-collapse");
var offcanvasClose = document.querySelector(".offcanvas-close");
var navbarHamburger = document.querySelector(".navbar-hamburger"); // Toggle offcanvas

if (offcanvasToggle) {
  offcanvasToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    offcanvasCollapse.classList.toggle("open");
    navbarHamburger.classList.toggle("open");
    addRemoveOffcanvasBackdrop();
  });
} // Close offcanvas


if (offcanvasClose) {
  offcanvasClose.addEventListener("click", function (e) {
    e.stopPropagation();
    offcanvasCollapse.classList.remove("open");
    navbarHamburger.classList.remove("open");
    addRemoveOffcanvasBackdrop();
  });
} // Add/remove offcanvas backdrop


var addRemoveOffcanvasBackdrop = function addRemoveOffcanvasBackdrop() {
  if (offcanvasCollapse.classList.contains("open")) {
    var offcanvasBackdrop = document.createElement("div");
    offcanvasBackdrop.className = "offcanvas-collapse-backdrop offcanvas-backdrop fade show";
    document.body.appendChild(offcanvasBackdrop); // Remove offcanvas on backdrop click

    offcanvasBackdrop.addEventListener("click", function (e) {
      e.stopPropagation();
      offcanvasCollapse.classList.remove("open");
      navbarHamburger.classList.remove("open");
      addRemoveOffcanvasBackdrop();
    });
  } else {
    var _offcanvasBackdrop = document.querySelector(".offcanvas-collapse-backdrop");

    _offcanvasBackdrop.remove();
  }
};
/*--------------------------------------*/

/*	COUNTER UP DIGITS
/*--------------------------------------*/


var counterUp = window.counterUp.default;
var counterElements = document.getElementsByClassName("counter");

if (counterElements.length && typeof counterUp !== "undefined") {
  var _loop = function _loop(i) {
    var el = counterElements[i];
    var counterWaypoint = new Waypoint({
      element: el,
      handler: function handler() {
        counterUp(el, {
          duration: 1000,
          delay: 40
        });
        this.destroy();
      },
      offset: "bottom-in-view"
    });
  };

  for (var i = 0; i < counterElements.length; i++) {
    _loop(i);
  }
}
/*--------------------------------------*/

/*	PROGRESS BAR
/*--------------------------------------*/


var lineBars = document.getElementsByClassName("progressbar");

if (lineBars.length && typeof ProgressBar !== "undefined") {
  for (var _i2 = 0; _i2 < lineBars.length; _i2++) {
    var el = lineBars[_i2];
    var lineBarVal = el.getAttribute("data-value") || 100;
    var lineBar = new ProgressBar.Line(el, {
      strokeWidth: 3,
      easing: "easeInOut",
      duration: 3000,
      trailWidth: 3,
      text: {
        className: "progressbar-counter",
        style: null
      },
      step: function step(state, bar) {
        bar.setText(Math.round(bar.value() * 100) + " %");
      }
    });
    lineBar.animate(lineBarVal / 100);
  }
}
/*--------------------------------------*/

/*	PLYR VIDEO PLAYER
/*--------------------------------------*/
// Initialize Plyr Video Player


if (document.querySelectorAll(".js-player").length && typeof Plyr !== "undefined") {
  var players = Array.from(document.querySelectorAll(".js-player")).map(function (p) {
    return new Plyr(p);
  });
}
/*--------------------------------------*/

/*	ISOTOPE GALLERY
/*--------------------------------------*/
// Initialize Isotope galleries


$(".portfolio-grid").each(function (i, gridContainer) {
  var $gridContainer = $(gridContainer);
  var $gridFilter = $(gridContainer).closest('.section').find('.portfolio-filter');
  var $grid = $gridContainer.find(".isotope").imagesLoaded(function () {
    // init isotope
    $grid.isotope({
      itemSelector: ".grid-item",
      layoutMode: "masonry",
      percentPosition: true,
      masonry: {
        columnWidth: $grid.width() / 12
      },
      transitionDuration: "0.5s"
    });
  });
  $(window).on("resize", function () {
    $grid.isotope({
      masonry: {
        columnWidth: $grid.width() / 12
      }
    });
  });
  $(window).on("load", function () {
    $grid.isotope({
      masonry: {
        columnWidth: $grid.width() / 12
      }
    });
  });
  $gridFilter.on('click', 'a', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });
});
/*--------------------------------------*/

/*	SWIPER SLIDER
/*--------------------------------------*/
// DEFAULT CAROUSEL

var oricaCarousels = document.getElementsByClassName("orica-carousel");

if (oricaCarousels.length && typeof Swiper !== "undefined") {
  for (var _i3 = 0; _i3 < oricaCarousels.length; _i3++) {
    var _el = oricaCarousels[_i3];

    var swiperContainer = _el.getElementsByClassName("swiper-container")[0];

    var carouselData = swiperContainer.getAttribute("data-swiper") || null;
    var carouselDefaults = {
      loop: true,
      paginationClickable: true,
      pauseOnMouseEnter: true,
      autoplay: {
        delay: 5000
      },
      speed: 1000,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      },
      on: {
        init: function init() {
          customCursor();
        }
      }
    };
    carouselData = JSON.parse(carouselData);
    var carouselOptions = Object.assign({}, carouselDefaults, carouselData);
    var oricaCarousel = new Swiper(swiperContainer, carouselOptions);
  } //end for

} //end if
// CAROUSEL WITH CUSTOM CONTROLS


var oricaCustomCarousels = document.getElementsByClassName("orica-custom-carousel");

if (oricaCustomCarousels.length && typeof Swiper !== "undefined") {
  for (var _i4 = 0; _i4 < oricaCustomCarousels.length; _i4++) {
    var _el2 = oricaCustomCarousels[_i4];

    var _swiperContainer = _el2.getElementsByClassName("swiper-container")[0];

    var swiperNext = _el2.getElementsByClassName("carousel-nav-next")[0];

    var swiperPrev = _el2.getElementsByClassName("carousel-nav-prev")[0];

    var swiperCounter = _el2.getElementsByClassName("carousel-counter")[0];

    var _carouselData = _swiperContainer.getAttribute("data-swiper") || null;

    var _carouselDefaults = {
      loop: true,
      paginationClickable: true,
      pauseOnMouseEnter: true,
      autoplay: {
        delay: 5000
      },
      speed: 1000,
      pagination: {
        el: swiperCounter,
        type: "custom",
        renderCustom: function renderCustom(swiper, current, total) {
          return '<span class="counter-current">' + current + '</span><span class="line-divider"></span><span class="counter-total">' + total + "</span>";
        }
      },
      navigation: {
        nextEl: swiperNext,
        prevEl: swiperPrev
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      },
      on: {
        init: function init() {
          customCursor();
        }
      }
    };
    _carouselData = JSON.parse(_carouselData);

    var _carouselOptions = Object.assign({}, _carouselDefaults, _carouselData);

    var oricaCustomCarousel = new Swiper(_swiperContainer, _carouselOptions);
  } //end for

} //end if

/*--------------------------------------*/

/*	CONTACT FORM
/*--------------------------------------*/


$('#contact-form').on('submit', function (e) {
  e.preventDefault();
  var url = "php/contact.php"; //path to your php handler
  // AJAX

  $.ajax({
    type: "POST",
    url: url,
    data: $(this).serialize(),
    success: function success(data) {
      var messageType = 'alert-' + data.status;
      var messageText = data.message;
      var alertBox = '<div class="alert ' + messageType + ' alert-dismissible fade show mb-4" role="alert">' + messageText + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      if (messageType && messageText) {
        $('#contact-form').find('.messages').html(alertBox);
        $('#contact-form')[0].reset();
      }
    }
  });
  return false;
});