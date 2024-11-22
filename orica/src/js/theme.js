/*--------------------------------------*/
/*	PRELOADER
/*--------------------------------------*/
window.addEventListener("load", preloader, false);

// Preloader animation show/hide
function preloader() {
    if (document.getElementById("preloader")) {
        setTimeout(() => {
            document.getElementById("preloader").style.visibility = "hidden";
        }, 800);
    }
}

/*--------------------------------------*/
/*	COOKIES
/*--------------------------------------*/
window.addEventListener("load", cookiePopup, false);

// Cookie popup Show/Hide
function cookiePopup() {
    const cookiePopup = document.querySelector(".cookie-popup");
    if (cookiePopup) {
        const agreeBtn = cookiePopup.querySelector(".cookie-popup-actions .accept-cookie");
        declineBtn = cookiePopup.querySelector(".cookie-popup-actions .decline-cookie");

        // Agree btn cookie setup (replace orica_cookie with your value)
        agreeBtn.addEventListener("click", () => {
            document.cookie = "orica_cookie=agree; max-age=" + 60 * 60 * 24 * 30;
            if (document.cookie) {
                cookiePopup.classList.add("hide");
            }
        });

        // Decline btn cookie setup (replace orica_cookie with your value)
        declineBtn.addEventListener("click", () => {
            document.cookie = "orica_cookie=agree; max-age=" + 60 * 60 * 24 * 30;
            if (document.cookie) {
                cookiePopup.classList.add("hide");
            }
        });

        // Check cookie
        let checkCookie = document.cookie.indexOf("orica_cookie=agree");
        checkCookie != -1 ? cookiePopup.classList.add("hide") : cookiePopup.classList.remove("hide");
    }
}

/*--------------------------------------*/
/*	CURSOR
/*--------------------------------------*/
customCursor();

// Handle cursor on mousemove
document.body.addEventListener("mousemove", onMouseMove);

function customCursor() {
    const $siteCursor = document.querySelector(".site-cursor");

    // Default cursor text
    const $siteCursorText = "Discover";

    // Handle hoverable elements
    document.body.querySelectorAll("[data-hoverable='true']").forEach(function (el) {
        // Add Mouseover Listener
        el.addEventListener("mouseenter", (e) => {
            const $cursorTextAttribute = el.getAttribute("data-cursor-text");
            let $cursorText = $cursorTextAttribute ? $cursorTextAttribute : $siteCursorText;
            let $siteCursorHTML = '<span class="site-cursor-text is-hidden">' + $cursorText + "</span>";
            $siteCursor.innerHTML = $siteCursorHTML;
            const $cursorTextHolder = document.querySelector(".site-cursor-text");
            $siteCursor.classList.add("large");
            setTimeout(() => {
                $cursorTextHolder.classList.add("is-visible");
            }, 200);
        });

        // Add Mouseleave Listener
        el.addEventListener("mouseleave", (e) => {
            $siteCursor.classList.remove("large");
            $siteCursor.innerHTML = "";
        });
    });
}

// Handle hoverable navbar links
document.querySelectorAll(".navbar a").forEach(function (el) {
    const $siteCursor = document.querySelector(".site-cursor");

    // Add Mouseover Listener
    el.addEventListener("mouseenter", (e) => {
        $siteCursor.classList.add("link");
        setTimeout(() => {
            $siteCursor.classList.add("is-visible");
        }, 200);
    });

    // Add Mouseleave Listener
    el.addEventListener("mouseleave", (e) => {
        $siteCursor.classList.remove("link");
    });
});

// Handle the cursor position on move
function onMouseMove(e) {
    const $siteCursor = document.querySelector(".site-cursor");
    if ($(".site-cursor.large").length) {
        $(".site-cursor.large").css({
            left: e.clientX - 30,
            top: e.clientY - 30,
        });
    } else {
        $(".site-cursor").css({
            left: e.clientX - 9,
            top: e.clientY - 9,
        });
    }

    if (!!window.IntersectionObserver) {
        var options = {
            root: null,
            rootMargin: "-30px",
            threshold: 0.1,
        };
        var callback = function (entries, observer) {
            entries.forEach((entry) => {
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
}

// Scroll down btn
const scrollBtnDown = document.querySelector(".scroll-btn-down");

if (scrollBtnDown) {
    // Handle button animation on scroll
    window.addEventListener("scroll", (e) => {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrolled = scroll / height;
        scrollBtnDown.style.setProperty("--scroll-down-progress", scrolled);
    });
}

// Show btn on load
window.onload = function () {
    scrollBtnDown.classList.add("active");
};

// Handle Scroll button  click
scrollBtnDown.addEventListener("click", () => {
    const visibleSection = findVisibleSection();
    if ($(visibleSection).next("[data-scroll-section='true']")[0]) {
        $(visibleSection).next("[data-scroll-section='true']")[0].scrollIntoView();
    }
});

// Find current visible section
const findVisibleSection = () => {
    const scetionsArray = document.querySelectorAll("[data-scroll-section='true']");
    let visibleElem = false;
    if (scetionsArray.length) {
        for (const [i, elem] of scetionsArray.entries()) {
            if (checkVisible(elem)) {
                visibleElem = elem;
            }
        }
    }
    return visibleElem;
};

// Checks is element visible
const checkVisible = (elem, threshold, mode) => {
    threshold = threshold || 0;
    mode = mode || "visible";

    const rect = elem.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

    const above = rect.bottom - threshold < 0;
    const below = rect.top - viewHeight + threshold >= 0;

    return mode === "above" ? above : mode === "below" ? below : !above && !below;
};

/*--------------------------------------*/
/*	SCROLL TO TOP BUTTON
/*--------------------------------------*/
const scrollBtnUp = document.querySelector(".scroll-btn-up");
if (scrollBtnUp) {
    window.addEventListener("scroll", (e) => {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrolled = scroll / height;
        if (scrollBtnUp) {
            scrollBtnUp.style.setProperty("--scroll-up-progress", scrolled);
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollBtnUp.classList.add("active");
            } else {
                scrollBtnUp.classList.remove("active");
            }
        }
    });

    scrollBtnUp.addEventListener("click", () => {
        window.scroll({ top: 0, behavior: "smooth" });
    });
}

/*--------------------------------------*/
/*	OFFCANVAS MENU
/*--------------------------------------*/
const offcanvasToggle = document.querySelector('[data-offcanvas-toggle="offcanvas"]');
const offcanvasCollapse = document.querySelector(".offcanvas-collapse");
const offcanvasClose = document.querySelector(".offcanvas-close");
const navbarHamburger = document.querySelector(".navbar-hamburger");

// Toggle offcanvas
if (offcanvasToggle) {
    offcanvasToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        offcanvasCollapse.classList.toggle("open");
        navbarHamburger.classList.toggle("open");
        addRemoveOffcanvasBackdrop();
    });
}

// Close offcanvas
if (offcanvasClose) {
    offcanvasClose.addEventListener("click", (e) => {
        e.stopPropagation();
        offcanvasCollapse.classList.remove("open");
        navbarHamburger.classList.remove("open");
        addRemoveOffcanvasBackdrop();
    });
}

// Add/remove offcanvas backdrop
const addRemoveOffcanvasBackdrop = () => {
    if (offcanvasCollapse.classList.contains("open")) {
        const offcanvasBackdrop = document.createElement("div");
        offcanvasBackdrop.className = "offcanvas-collapse-backdrop offcanvas-backdrop fade show";
        document.body.appendChild(offcanvasBackdrop);
        // Remove offcanvas on backdrop click
        offcanvasBackdrop.addEventListener("click", (e) => {
            e.stopPropagation();
            offcanvasCollapse.classList.remove("open");
            navbarHamburger.classList.remove("open");
            addRemoveOffcanvasBackdrop();
        });
    } else {
        const offcanvasBackdrop = document.querySelector(".offcanvas-collapse-backdrop");
        offcanvasBackdrop.remove();
    }
};

/*--------------------------------------*/
/*	COUNTER UP DIGITS
/*--------------------------------------*/
const counterUp = window.counterUp.default;
const counterElements = document.getElementsByClassName("counter");
if (counterElements.length && typeof counterUp !== "undefined") {
    for (let i = 0; i < counterElements.length; i++) {
        const el = counterElements[i];
        const counterWaypoint = new Waypoint({
            element: el,
            handler: function () {
                counterUp(el, {
                    duration: 1000,
                    delay: 40,
                });
                this.destroy();
            },
            offset: "bottom-in-view",
        });
    }
}
/*--------------------------------------*/
/*	PROGRESS BAR
/*--------------------------------------*/
const lineBars = document.getElementsByClassName("progressbar");

if (lineBars.length && typeof ProgressBar !== "undefined") {
    for (let i = 0; i < lineBars.length; i++) {
        const el = lineBars[i];
        const lineBarVal = el.getAttribute("data-value") || 100;

        const lineBar = new ProgressBar.Line(el, {
            strokeWidth: 3,
            easing: "easeInOut",
            duration: 3000,
            trailWidth: 3,
            text: {
                className: "progressbar-counter",
                style: null,
            },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + " %");
            },
        });
        lineBar.animate(lineBarVal / 100);
    }
}

/*--------------------------------------*/
/*	PLYR VIDEO PLAYER
/*--------------------------------------*/
// Initialize Plyr Video Player
if (document.querySelectorAll(".js-player").length && typeof Plyr !== "undefined") {
    const players = Array.from(document.querySelectorAll(".js-player")).map((p) => new Plyr(p));
}

/*--------------------------------------*/
/*	ISOTOPE GALLERY
/*--------------------------------------*/
// Initialize Isotope galleries
$(".portfolio-grid").each((i, gridContainer) => {
    const $gridContainer = $(gridContainer);
    const $gridFilter = $(gridContainer).closest('.section').find('.portfolio-filter');
    const $grid = $gridContainer.find(".isotope").imagesLoaded(() => {
        // init isotope
        $grid.isotope({
            itemSelector: ".grid-item",
            layoutMode: "masonry",
            percentPosition: true,
            masonry: {
                columnWidth: $grid.width() / 12,
            },
            transitionDuration: "0.5s",
        });
    });

    $(window).on("resize", () => {
        $grid.isotope({
            masonry: {
                columnWidth: $grid.width() / 12,
            },
        });
    });

    $(window).on("load", () => {
        $grid.isotope({
            masonry: {
                columnWidth: $grid.width() / 12,
            },
        });
    });
    $gridFilter.on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
});
/*--------------------------------------*/
/*	SWIPER SLIDER
/*--------------------------------------*/
// DEFAULT CAROUSEL
const oricaCarousels = document.getElementsByClassName("orica-carousel");

if (oricaCarousels.length && typeof Swiper !== "undefined") {
    for (let i = 0; i < oricaCarousels.length; i++) {
        const el = oricaCarousels[i];
        const swiperContainer = el.getElementsByClassName("swiper-container")[0];
        let carouselData = swiperContainer.getAttribute("data-swiper") || null;

        const carouselDefaults = {
            loop: true,
            paginationClickable: true,
            pauseOnMouseEnter: true,
            autoplay: {
                delay: 5000,
            },
            speed: 1000,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
            on: {
                init: function () {
                    customCursor();
                },
            },
        };

        carouselData = JSON.parse(carouselData);

        const carouselOptions = Object.assign({}, carouselDefaults, carouselData);

        const oricaCarousel = new Swiper(swiperContainer, carouselOptions);
    } //end for
} //end if

// CAROUSEL WITH CUSTOM CONTROLS
const oricaCustomCarousels = document.getElementsByClassName("orica-custom-carousel");

if (oricaCustomCarousels.length && typeof Swiper !== "undefined") {
    for (let i = 0; i < oricaCustomCarousels.length; i++) {
        const el = oricaCustomCarousels[i];

        const swiperContainer = el.getElementsByClassName("swiper-container")[0];
        const swiperNext = el.getElementsByClassName("carousel-nav-next")[0];
        const swiperPrev = el.getElementsByClassName("carousel-nav-prev")[0];
        const swiperCounter = el.getElementsByClassName("carousel-counter")[0];
        let carouselData = swiperContainer.getAttribute("data-swiper") || null;

        const carouselDefaults = {
            loop: true,
            paginationClickable: true,
            pauseOnMouseEnter: true,
            autoplay: {
                delay: 5000,
            },
            speed: 1000,
            pagination: {
                el: swiperCounter,
                type: "custom",
                renderCustom: function (swiper, current, total) {
                    return (
                        '<span class="counter-current">' +
                        current +
                        '</span><span class="line-divider"></span><span class="counter-total">' +
                        total +
                        "</span>"
                    );
                },
            },
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
            on: {
                init: function () {
                    customCursor();
                },
            },
        };
        carouselData = JSON.parse(carouselData);

        const carouselOptions = Object.assign({}, carouselDefaults, carouselData);

        const oricaCustomCarousel = new Swiper(swiperContainer, carouselOptions);
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
        success: function (data)
        {
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
})