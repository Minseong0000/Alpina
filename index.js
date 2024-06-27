/* //페이지 전환
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  let isScrolling = false;
  let scrollTimeout;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      currentSectionIndex = index;
      setIsScrolling();
    }
  }

  function setIsScrolling() {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 500); // Shortened the timeout to 500ms for better responsiveness
  }

  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  const handleScroll = throttle((event) => {
    if (!isScrolling) {
      if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }, 150); // Reduced throttle limit to 150ms for wheel events

  window.addEventListener("wheel", handleScroll);

  const handleKeyDown = throttle((event) => {
    if (!isScrolling) {
      if (
        event.key === "ArrowDown" &&
        currentSectionIndex < sections.length - 1
      ) {
        scrollToSection(currentSectionIndex + 1);
      } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }, 150); // Consistent throttle timing of 150ms for key events

  let startY = 0;

  window.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
  });

  const handleTouchMove = throttle((event) => {
    if (!isScrolling) {
      const endY = event.touches[0].clientY;
      const deltaY = startY - endY;
      if (deltaY > 50 && currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      } else if (deltaY < -50 && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }, 150); // Applied consistent throttle timing of 150ms to touch move events

  window.addEventListener("touchmove", handleTouchMove);

  // IntersectionObserver to load sections dynamically
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once the section is visible
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}); */
const elSectionList = [...document.querySelectorAll(".section")];
const elAnchorList = [...document.querySelectorAll(".anchor")];
const elMap = new Map();
const tryAddingToElMap = (elAnchor) => {
  const href = elAnchor.getAttribute("href");
  const id = href ? href.slice(1) : "";
  const elSection = elSectionList.find((elSection) => elSection.id === id);
  if (elSection) elMap.set(elSection, elAnchor);
};
const isIntersecting = (entry) => entry.isIntersecting;
const isNotIntersecting = (entry) => !entry.isIntersecting;
const activate = (el) => el.classList.add("is-active");
const activateLinkedAnchor = (entry) => activate(elMap.get(entry.target));
const deactivate = (el) => el.classList.remove("is-active");
const deactivateLinkedAnchor = (entry) => deactivate(elMap.get(entry.target));
const toggleElAnchorActivities = (entries) => {
  entries.filter(isIntersecting).forEach(activateLinkedAnchor);
  entries.filter(isNotIntersecting).forEach(deactivateLinkedAnchor);
};
const intersectionObserverOptions = {
  root: document.querySelector(".full-page-scrolling-container") || document,
  rootMargin: "-50% 0%",
  threshold: 0,
};
const intersectionObserver = new IntersectionObserver(
  toggleElAnchorActivities,
  intersectionObserverOptions
);
const observeElSection = (elAnchor, elSection) =>
  intersectionObserver.observe(elSection);
elAnchorList.forEach(tryAddingToElMap);
elMap.forEach(observeElSection);

$(".owl-carousel").owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  dots: true,
  autoplay: false,
  autoplayTimeout: 1000,
  stagePadding: 50,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1.5,
    },
    800: {
      items: 2,
    },
    900: {
      items: 2.5,
    },
    1100: {
      items: 3,
    },
    1280: {
      items: 2,
    },
    1380: {
      items: 2.5,
    },
    1500: {
      items: 3,
    },
  },
});
// owl carousel

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
/* gsap.registerPlugin(ScrollTrigger);
// .rolled-over-txt
gsap.utils.toArray(".rolled-over-txt").forEach((txt) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".about",
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
}); */
// 예약페이지 문구
function updatePlaceholders() {
  const inputs = document.querySelectorAll(".reserve");
  inputs.forEach((input) => {
    if (window.innerWidth >= 1280) {
      input.placeholder = "";
    } else {
      // 초기 placeholder 값을 저장하고 다시 설정
      input.placeholder = input.getAttribute("data-placeholder");
    }
  });
}

// 초기 실행
document.querySelectorAll(".reserve").forEach((input) => {
  // placeholder 초기 값을 data-placeholder에 저장
  input.setAttribute("data-placeholder", input.placeholder);
});
updatePlaceholders();

// 윈도우 크기 변경시 실행
window.addEventListener("resize", updatePlaceholders);

// 높이값 확인
/* var section = document.querySelector(".menu-story");
var sectionHeight = section.offsetHeight;
console.log(sectionHeight); */

document.addEventListener("DOMContentLoaded", (event) => {
  const sections = document.querySelectorAll("section");
  const headerElement = document.querySelector(".header-wrap");

  const observerOptions = {
    root: null, // viewport를 root로 사용
    rootMargin: "0px",
    threshold: 0.5, // 섹션의 50%가 보이면 콜백 실행
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target);
        if (index === 0 || index === sections.length - 1) {
          headerElement.classList.remove("highlight");
        } else {
          headerElement.classList.add("highlight");
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
});

// flex 구간
document.addEventListener("DOMContentLoaded", function () {
  function toggleClass() {
    const flex = document.querySelector(".effect");
    if (window.innerWidth >= 1280) {
      flex.classList.add("flex-wrap");
    } else {
      flex.classList.remove("flex-wrap");
    }
  }
  // Initial check
  toggleClass();

  // Check on resize
  window.addEventListener("resize", toggleClass);
});
