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

### 2. 디자인 가이드 라인

## KEYWORD
#열정

#진중

#깔끔

## COLOR PALETTE

무색이 주는 클래식함에 빨간 포인트 컬러로 열정을 담아내고자 했습니다.

![Group 19 (1)](https://github.com/Minseong0000/Alpina/assets/160007497/87376fa3-094d-4fa2-8bf3-ed584d1ea134)

## TYPOGRAPHY

![Group 20](https://github.com/Minseong0000/Alpina/assets/160007497/53bca059-ca1f-4d15-9de0-7962b20ecace)

## STYLE

![Group 24](https://github.com/Minseong0000/Alpina/assets/160007497/da80a1b4-927c-4f4c-84e0-f27b10c90473)

---

### 3. 디렉토리 구조

![디렉토리](https://github.com/Minseong0000/Alpina/assets/160007497/8192faa6-df4a-4d9c-8836-40715efa22d5)

---

### 4. 퍼블리싱 

- SLIDER
  
  owl carousel을 사용하여 구현

```
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

```
  
- FULL PAGE SCROLL ANIMATION
  
  scrollTo()메서드, setTimeout()메서드, intersectionObserver 등으로 페이지 스크롤, 페이지 전환후 딜레이, 변환효과등을 구현
   
```
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

```

- BREAK POINT

  Media query를 활용하여 width/height 값에 따라 변동된 수치 적용

```
@media (width >=600px){}, @media (width >=1280px){}, 등

```

---

### 5. 문제 & 해결

- 문제1. 컨텐츠 요소들에 여백값을 px로 주지 않았을 때, 브라우저 높이값에 따라, 컨텐츠가 완전히 무너짐

  해결1. 여백값을 정확히 주어야할 요소에는 px로 주거나 미디어쿼리를 사용하여 %단위로 줌

- 문제2. 이미지 깨짐 현상

  해결2. 이미지를 각 사이즈별로 저장하여, 미디어 쿼리를 사용해서 특정 구간에서 이미지가 바뀌게 설정

- 문제3. swiper의 반복적인 사용

  해결3. owl-carousel이란 새로운 플러그인을 사용하여 슬라이더 제작

- 문제4. 컨텐츠가 중앙에 있어서 읽는 위치가 아쉬움

  해결4. 컨텐츠의 padding-top값을 줄여서 전체적으로 위로 움직임

- 문제5. pc버전에서 예약폼 영역의 크기가 너무 작아서 유저들의 불편을 야기

  해결5. padding값을 더 크게 주어, 사용하기 편하게 함

- 문제6. 페이지 로드시, 렉으로 인한 컨텐츠 미표시

  해결6-1. 이미지를 .webp 형식으로 변환하여 사용하였으나 렉이 완화되기는 했지만 같은현상 보여짐

  해결6-2. 스크립트를 바꿈

---

### 프로젝트 후기

디자인 능력을 한층 끌어 올렸다.

이번 프로젝트를 통하여 전적으로 맡아 해본적 없는 디자인을 처음부터 끝까지 진행하며, 
여러가지 스타일(여백, 행간, 등)들이 일관성이 없으면 퍼블리싱을 할 때 어느 부분에서 문제가 되는지,
그리고 디자인이 내용 전달에 주는 도움이 엄청 크다는 것을 알게 되었다.

<a href="https://minseong0000.github.io/Alpina/" target="_blank">프로젝트 바로가기</a>

