## Alpina restaurant(Brig,switzerland) 홈페이지 리디자인 및 퍼블리싱

### 0.Alpina restaurant 홈페이지

사용기술: JavaScript, GSAP, jQuery, Owl carousel

작업기간: 2024.06.18 ~ 2024. 06.26

작업유형: 개인 프로젝트(기여도 100%)

![Alpina](https://github.com/Minseong0000/Alpina/assets/160007497/990dc569-a9f1-4d80-aaa6-d808d42d3851)

---

### 1. 이 프로젝트를 통해 얻고자 하는 게 무엇인가?

- 디자인 감각을 한층 더 끌어 올리고 싶었다.
- 전달하고자 하는 내용을 효과적으로 전달하고 싶었다.
- 반응형 웹페이지를 만들때 고려해야 할 부분을 파악하는 능력을 키우고 싶었다.
- 웹 퍼블리싱의 구조적인 설계 숙련도를 높이고 싶었다.

---

### 2. 프로젝트를 하며 느낀 점

- 디자인의 일관성을 살리면서 전달하고자하는 내용을 전부 온전히 전달하는것은 쉽지 않은걸 느꼈다.
- 단순 코드의 순서가 웹페이지에 렉을 유발할 수 있다는 것을 알게 되었다.

---

### 3. 디렉토리 구조

![디렉토리](https://github.com/Minseong0000/Alpina/assets/160007497/8192faa6-df4a-4d9c-8836-40715efa22d5)

---

### 4. 문제 & 해결

문제1. 컨텐츠 요소들에 여백값을 px로 주지 않았을 때, 브라우저 높이값에 따라, 컨텐츠가 완전히 무너짐
해결1. 여백값을 정확히 주어야할 요소에는 px로 주거나 미디어쿼리를 사용하여 %단위로 줌

문제2. 이미지 깨짐 현상
해결2. 이미지를 각 사이즈별로 저장하여, 미디어 쿼리를 사용해서 특정 구간에서 이미지가 바뀌게 설정

문제3. swiper의 반복적인 사용
해결3. owl-carousel이란 새로운 플러그인을 사용하여 슬라이더 제작

문제4. 페이지 로드시, 렉으로 인한 컨텐츠 미표시
해결4-1. 이미지를 .webp 형식으로 변환하여 사용하였으나 렉이 완화되기는 했지만 같은현상 보여짐
해결4-2. 스크립트를 바꿈 

**문제**

페이지 로드시, 이미지와 텍스트가 렉이 걸려서 화면에 표시되지 않는 경우가 많았음.

```
      
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
});

```


**해결**

```

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

```

---

### 프로젝트 후기

디자인 능력을 한층 끌어 올렸다.

이번 프로젝트를 통하여 전적으로 맡아 해본적 없는 디자인을 처음부터 끝까지 진행하며, 
여러가지 스타일(여백, 행간, 등)들이 일관성이 없으면 퍼블리싱을 할 때 어느 부분에서 문제가 되는지,
그리고 디자인적 시선에서 얼마나 어색한지 배웠다. 

<a href="https://minseong0000.github.io/Alpina/" target="_blank">프로젝트 바로가기</a>

