"use strict";

// Navigation Bar

const header = document.querySelector("header");
const observer = new IntersectionObserver(
  ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
  { threshold: [1] }
);

observer.observe(header);

// Hamburger logic

const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector(".navbarToggle");
const navMenu = navbar.querySelector(".navMenu")

function openMobileNavbar() {
  navbar.classList.add("opened");
  navbarToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
  navbar.classList.remove("opened");
  navbarToggle.setAttribute("aria-label", "Open navigation menu.");
}

navbarToggle.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});

navMenu.addEventListener("click", closeMobileNavbar)