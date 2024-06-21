// 페이지 전환
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      currentSectionIndex = index;
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleScroll = debounce((event) => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
      // Scrolling down
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      // Scrolling up
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }, 100);

  window.addEventListener("wheel", handleScroll);

  const handleKeyDown = debounce((event) => {
    if (event.key === "ArrowDown") {
      // Arrow down key
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else if (event.key === "ArrowUp") {
      // Arrow up key
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }, 100);

  window.addEventListener("keydown", handleKeyDown);
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
});
// swiper

$(function () {
  $(".hamburger-menu").on("click", () => {
    $(".site-menu").toggleClass("reveal");
    $(".hamburger-menu").toggleClass("active");
  });
});

// menu

document.addEventListener("DOMContentLoaded", function () {
  var element = document.querySelector(".brand-story");
  element.classList.add("layer");
  setTimeout(function () {
    element.classList.remove("layer");
  }, 5000); // 5초 후에 클래스 제거
});

// 페이지로드시 레이어

// GSAP
// 스크롤트리거
gsap.registerPlugin(ScrollTrigger);
// .rolled-over-txt
gsap.utils.toArray(".rolled-over-txt").forEach((txt) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: txt,
        start: "100% 100%",
        end: "100% 100%",
        scrub: 1,
      },
    })
    .fromTo(
      txt,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        duration: 5,
      }
    );
});
