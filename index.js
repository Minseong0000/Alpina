//페이지전환
const elSectionList = [...document.querySelectorAll(".section")];
let isScrolling = false;

const isIntersecting = (entry) => entry.isIntersecting;
const isNotIntersecting = (entry) => !entry.isIntersecting;

const activate = (el) => {
  el.classList.add("is-active");
  el.style.opacity = "1"; // Make it fully opaque
};

const deactivate = (el) => {
  el.classList.remove("is-active");
  el.style.opacity = "0.5"; // Reduce opacity
};

const toggleSectionActivities = (entries) => {
  entries.filter(isIntersecting).forEach((entry) => activate(entry.target));
  entries
    .filter(isNotIntersecting)
    .forEach((entry) => deactivate(entry.target));
};

const intersectionObserverOptions = {
  root: document.querySelector(".full-page-scrolling-container") || document,
  rootMargin: "-50% 0%",
  threshold: 0,
};

const intersectionObserver = new IntersectionObserver(
  toggleSectionActivities,
  intersectionObserverOptions
);

elSectionList.forEach((section) => intersectionObserver.observe(section));

const scrollToSection = (sectionIndex) => {
  const section = elSectionList[sectionIndex];
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }
};

const handleScroll = (event) => {
  if (isScrolling) return;
  isScrolling = true;

  const currentSectionIndex = elSectionList.findIndex((section) =>
    section.classList.contains("is-active")
  );
  if (event.deltaY > 0 && currentSectionIndex < elSectionList.length - 1) {
    scrollToSection(currentSectionIndex + 1);
  } else if (event.deltaY < 0 && currentSectionIndex > 0) {
    scrollToSection(currentSectionIndex - 1);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 1500); // Set this time to match the scroll behavior
};

window.addEventListener("wheel", handleScroll, { passive: false });

//slider
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
