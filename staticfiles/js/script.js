"use strict";


// variable declarations
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section");
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarContent = document.querySelector(".navbar-content");
const navbarLogoToggler = document.querySelector(".navbar-logo-toggler");
const navLinks = document.querySelectorAll(".nav-link");
const exploreButton = document.querySelector("#explore");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const backToTop = document.querySelector(".back-to-top");


// functions

// sticky nav using intersection observer API
const stickyNav = function (entries) {
    const [entry] = entries; // only one entry expected

    if (!entry.isIntersecting) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
};



// navbar toggler  & navigation
navbarToggler.addEventListener('click', () => {
    navbarContent.classList.toggle("active");
    navbar.classList.toggle("active");
})


navLinks.forEach((link) => {

    link.addEventListener('click', () => {
        navbarContent.classList.toggle("active");
        navbar.classList.toggle("active");
    })
});



// smooth scrolling into section 2

// method 1: for older browser
exploreButton.addEventListener('click', () => {
    const section2Coords = section2.getBoundingClientRect();

    // window.scrollTo({
    //     left: section2Coords.left + window.scrollX,
    //     top: section2Coords.top + window.scrollY,
    //     behavior: "smooth"
    // });

    // newer browsers
    section2.scrollIntoView({ behavior: "smooth" });
})



// back to top 
backToTop.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: "smooth" });
});



const navbarHeight = navbar.getBoundingClientRect().height;
// activate sticky nav depending on position of header section
const headerObserver = new IntersectionObserver(
    stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navbarHeight}px` // because startin section 2 we have a translate
});


headerObserver.observe(header);



// // section transition
const sectionLazyReveal = function () {
    sections.forEach((section) => {
        section.classList.add('section__hidden');  // hide each section first
    })



    const revealSection = function (entries, observer) {
        const [entry] = entries;

        if (entry.isIntersecting) {
            entry.target.classList.remove("section__hidden");
            entry.observer.unobserve(target);
        } else {
            return;

        }
        // on reveal, stop observing

    };



    const sectionObserver = new IntersectionObserver(
        revealSection, {
        root: null,
        threshold: 0.15, // reveal section 15% off intersection

    });


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


sectionLazyReveal();






/////////////////   testimonial slider   /////////////////// 
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<div class="dots__dot" data-slide="${i}"></div>`
            );
        });
    };

    const activateDot = function (slide_no) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide_no}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide_no) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide_no)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        // due to 0-indexing
        if (curSlide === maxSlide - 1) {
            curSlide = 0; // reset
        } else {
            // go to next
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            // reset to 0-indexed last slide
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {

        // using short-circuiting
        e.key === 'ArrowLeft' && prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });


    // use dots for navigation
    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset; // get data-slide number
            goToSlide(slide);
            activateDot(slide);
        }
    });
};


slider();
