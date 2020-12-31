"use strict"

let slideIndex = 1;

let slideTimer;

/* let slideshowContainer; */

window.addEventListener("load", function () {
  showSlides(slideIndex);
  slideTimer = setTimeout(function () { plusSlides(1) }, 4000);

  //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
  // slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];

  //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
  // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];

  // slideshowContainer.addEventListener('mouseenter', pause)
  // slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n) {
  clearTimeout(slideTimer);
  if (n < 0) {
    showSlides(slideIndex -= 1);
  } else {
    showSlides(slideIndex += 1);

  }

  //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME

  if (n === -1) {
    slideTimer = setTimeout(function () { plusSlides(n + 2) }, 4000);
  } else {
    slideTimer = setTimeout(function () { plusSlides(n + 1) }, 4000);
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n) {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(function () { plusSlides(n + 1) }, 4000);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("bookCoverSlide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  Array.from(slides).forEach(function hideSlide(slide) {
    slide.classList.remove("showSlide");
  })
  Array.from(dots).forEach(function inactiveDots(dot) {
    dot.className = dot.className.replace(" active", "");

  });

  slides[slideIndex - 1].classList.toggle("showSlide")
  dots[slideIndex - 1].className += " active";
}

/*
pause = () => {
  clearTimeout(slideTimer);
}

resume = () => {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(function () { plusSlides(slideIndex) }, 8000);
}
*/