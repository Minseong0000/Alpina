//페이지 넘김
const elSectionList = [...document.querySelectorAll(".section")];
let isScrolling = false;
let currentSectionIndex = 0;

const activate = (el) => {
  el.classList.add("is-active");
};

const deactivate = (el) => {
  el.classList.remove("is-active");
};

const toggleSectionActivities = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      activate(entry.target);
      currentSectionIndex = elSectionList.indexOf(entry.target);
    } else {
      deactivate(entry.target);
    }
  });
};

const intersectionObserverOptions = {
  root: document.querySelector(".full-page-scrolling-container") || null,
  rootMargin: "-50% 0%",
  threshold: 0,
};

const intersectionObserver = new IntersectionObserver(
  toggleSectionActivities,
  intersectionObserverOptions
);

// 1280px 이상일땐 3번째 섹션 무시 [flex로 1개 섹션 감소]
const observeSections = () => {
  intersectionObserver.disconnect(); // 기존 관찰 중인 섹션을 모두 해제
  elSectionList.forEach((section, index) => {
    if (window.innerWidth < 1280 || index !== 2) {
      intersectionObserver.observe(section);
    }
  });
};

observeSections();

const scrollToSection = (sectionIndex) => {
  const section = elSectionList[sectionIndex];
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const handleScroll = (event) => {
  event.preventDefault(); // 디폴트값 방지

  if (isScrolling) return;
  isScrolling = true;

  const delta = Math.sign(event.deltaY);
  let nextSectionIndex = currentSectionIndex + delta;

  // 3번째 섹션 스킵(1280px이상일시)
  if (window.innerWidth >= 1280) {
    if (nextSectionIndex === 2) {
      nextSectionIndex += delta > 0 ? 1 : -1;
    }
  }

  if (nextSectionIndex >= 0 && nextSectionIndex < elSectionList.length) {
    // 다음 페이지로 스크롤
    scrollToSection(nextSectionIndex);
  }

  // 리셋
  setTimeout(() => {
    isScrolling = false;
  }, 1000); // 부드러운 움직임을 위해 1초 시간 딜레이
};

window.addEventListener("wheel", handleScroll, { passive: false });

// 페이지 새로고침을 트리거하는 리사이즈 이벤트 핸들러
window.addEventListener("resize", () => {
  location.reload();
});

//slider
$(".owl-carousel").owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  dots: true,
  autoplay: false,
  autoplayTimeout: 1000,
  responsive: {
    0: {
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
