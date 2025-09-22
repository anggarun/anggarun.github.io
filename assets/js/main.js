/**
 * Template Name: iLanding
 * Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
 * Updated: Nov 12 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) return; 
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  // Fungsi untuk buka dropdown dengan animasi
  function openDropdown(ul) {
    ul.style.display = "block";
    ul.style.overflow = "hidden";
    ul.style.maxHeight = "0px";
    ul.style.opacity = "0";
    ul.style.transform = "translateY(-10px)";
    ul.style.transition = "all 0.3s ease";

    requestAnimationFrame(() => {
      ul.style.maxHeight = ul.scrollHeight + "px";
      ul.style.opacity = "1";
      ul.style.transform = "translateY(0)";
    });
  }

  // Fungsi untuk tutup dropdown dengan animasi
  function closeDropdown(ul) {
    ul.style.maxHeight = ul.scrollHeight + "px"; // set dulu tinggi sekarang
    ul.style.opacity = "1";
    ul.style.transform = "translateY(0)";

    requestAnimationFrame(() => {
      ul.style.maxHeight = "0px";
      ul.style.opacity = "0";
      ul.style.transform = "translateY(-10px)";
    });

    setTimeout(() => {
      ul.style.display = "none";
    }, 300); // tunggu transisi selesai
  }

  // Toggle dropdown saat klik tombol dropdown
  document.querySelectorAll("#navmenu .toggle-dropdown").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const dropdownMenu = this.nextElementSibling;

      // Tutup semua dropdown lain
      document.querySelectorAll("#navmenu .dropdown ul").forEach((ul) => {
        if (ul !== dropdownMenu) closeDropdown(ul);
      });

      // Toggle dropdown yang diklik
      if (dropdownMenu.style.display === "block") {
        closeDropdown(dropdownMenu);
      } else {
        openDropdown(dropdownMenu);
      }
    });
  });

  // Semua link di menu (termasuk dalam dropdown) → klik nutup menu
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.classList.contains("toggle-dropdown")) return;

      document.querySelectorAll("#navmenu .dropdown ul").forEach((ul) => {
        closeDropdown(ul);
      });

      if (document.querySelector(".mobile-nav-active")) {
        if (typeof mobileNavToogle === "function") {
          mobileNavToogle();
        }
      }
    });
  });

  // Klik di luar menu → tutup dropdown
  document.addEventListener("click", function () {
    document.querySelectorAll("#navmenu .dropdown ul").forEach((ul) => {
      closeDropdown(ul);
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // whats up button
  let waBtn = document.querySelector(".whatsapp");
  const waLink = "https://wa.link/2ggoz2";
  waBtn.setAttribute("href", waLink);
  waBtn.setAttribute("target", "_blank");

  function toggleWaBtn() {
    if (waBtn) {
      window.scrollY > 100
        ? waBtn.classList.add("active")
        : waBtn.classList.remove("active");
    }
  }

  window.addEventListener("load", toggleScrollTop);
  window.addEventListener("load", toggleWaBtn);
  document.addEventListener("scroll", toggleScrollTop);
  document.addEventListener("scroll", toggleWaBtn);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  const humburger = document.querySelector(".navbar-toggler");
  const btnClose = document.querySelector(".btn-close");
  const ofcanvasEL = document.getElementById("offcanvasNavbar");
  const bsOffCanfas = new bootstrap.Offcanvas(ofcanvasEL);
  humburger.addEventListener("click", function () {
    scrollTop.style.visibility = "hidden";
    humburger.classList.toggle("rotate");
    setTimeout(function () {
      scrollTop.style.display = "none";
      bsOffCanfas.show();
    }, 500);
  });
  btnClose.addEventListener("click", function () {
    btnClose.classList.toggle("rotate");
    setTimeout(function () {
      bsOffCanfas.hide();
    }, 500);
  });
  ofcanvasEL.addEventListener("hidden.bs.offcanvas", function () {
    humburger.classList.remove("rotate");
    scrollTop.style.visibility = "visible";
  });
  ofcanvasEL.addEventListener("show.bs.offcanvas", function () {
    btnClose.classList.remove("rotate");
  });


})();
