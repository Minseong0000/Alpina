## Alpina restaurant(Brig,Switzerland) 홈페이지 리디자인 및 퍼블리싱

### 0.Alpina restaurant 홈페이지

사용기술: JavaScript, jQuery, Owl carousel

작업기간: 2024.06.18 ~ 2024. 06.26

작업유형: 개인 프로젝트(기여도 100%)

![Alpina](https://github.com/Minseong0000/Alpina/assets/160007497/990dc569-a9f1-4d80-aaa6-d808d42d3851)

---

### 1. 이 프로젝트를 통해 얻고자 하는 게 무엇인가?

- 디자인 감각을 한층 더 끌어 올리고 싶다.
- 전달하고자 하는 내용을 효과적으로 전달하고 싶다.
- 모든 디바이스에 문제없는 반응형 웹을 만들고 싶다.
- 웹 퍼블리싱의 구조적인 설계 숙련도를 높이고 싶다.

---

### 2. 디자인 가이드 라인

## KEYWORD
#열정

#진중

#깔끔

## COLOR PALETTE

무채색이 주는 클래식함에 포인트 컬러로 열정을 담아내고자 했습니다.

![Group 19 (1)](https://github.com/Minseong0000/Alpina/assets/160007497/87376fa3-094d-4fa2-8bf3-ed584d1ea134)

## TYPOGRAPHY

![Group 20](https://github.com/Minseong0000/Alpina/assets/160007497/53bca059-ca1f-4d15-9de0-7962b20ecace)

## STYLE

![Group 25](https://github.com/Minseong0000/Alpina/assets/160007497/6c313bd4-1e0c-4222-b4c9-b4d97d4ebbce)


---

### 3. 디렉토리 구조

![디렉토리](https://github.com/Minseong0000/Alpina/assets/160007497/8192faa6-df4a-4d9c-8836-40715efa22d5)

---

### 4. 퍼블리싱 

- BREAKPOINT

  Media query를 활용하여 width/height 값에 따라 변동된 수치 적용
  
  width: 600px, 650px, 800px, 900px, 1050px, 1280px(이상 PC버전), 1500px, 1556px, 1650px, 1750px, 1850px
  
  height: 700px, 800px
  
  최적 모바일 버전 해상도: 390px(width)
  
  최적 PC버전 해상도: 1920px(width)

- SLIDER
  
  owl carousel을 사용하여 구현
  
- 비동기함수(setTimeout()),scrollTo(), intersectionObserver 활용하여 풀페이지 스크롤 애니메이션 구현
   
---

### 5. 문제 & 해결

- 문제1. 컨텐츠 요소들에 여백값을 px로 주지 않았을 때, 브라우저 높이값에 따라, 컨텐츠가 완전히 무너짐

  해결1. 여백값을 정확히 주어야할 요소에는 px로 주거나 미디어쿼리를 사용하여 %단위로 줌

```
@media (height <=800px) {
  .schedule .content-wrap {
    padding-top: 10%;
  }
}

```

```
.brand-story .content-wrap {
  padding-top: 300px;
}

```

- 문제2. 이미지 깨짐 현상

  해결2. 이미지를 각 사이즈별로 저장하여, 미디어 쿼리를 사용해서 특정 구간에서 이미지가 바뀌게 설정

```
  
@media (width >=800px) {
  .brand-story {
    background-image: url(./assets/images/bg6.webp);
  }
}

```

- 문제3. 컨텐츠가 중앙에 있어서 읽는 위치가 아쉬움

  해결3. 컨텐츠의 padding-top값을 줄여서 전체적으로 위로 움직임

- 문제4. pc버전에서 예약폼 영역의 크기가 너무 작아서 유저들의 불편을 야기

  해결4. padding값을 더 크게 주어, 사용하기 편하게 함

```
  .reservation .book>input {
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 100px;
  }

```

- 문제5. 페이지 로드시, 렉으로 인한 컨텐츠 미표시

  해결5-1. 이미지를 .webp 형식으로 변환하여 사용하였으나 렉이 완화되기는 했지만 같은현상 보여짐

  해결5-2. 스크립트를 바꿈
  

- 문제6. 교체한 스크립트가 pc버전에서 병합되는 2개의 섹션을 인지못하여, 섹션이 병합되는 구간에서 더이상 스크롤 되지 않는 현상 발생

  해결6. pc버전(1280px)에서는 병합되는 마지막 섹션을 스킵하게 만듬

```
const observeSections = () => {
  intersectionObserver.disconnect(); // 기존 관찰 중인 섹션을 모두 해제
  elSectionList.forEach((section, index) => {
    if (window.innerWidth < 1280 || index !== 2) {
      intersectionObserver.observe(section);
    }
  });
};
//조건 1280px이상이거나 인덱스2의 섹션(인덱스 1,2 의 섹션을 flex로 묶음)이 아닐시

if (window.innerWidth >= 1280) {
  if (nextSectionIndex === 2) {
    nextSectionIndex += delta > 0 ? 1 : -1;
  }
}

```

- 문제7. 교체한 스크립트가 브라우저 사이즈 조절시 적용이 되지 않음

  해결7. 페이지 새로고침을 하는 리사이즈 이벤트 적용

```
window.addEventListener("resize", () => {
  location.reload();
});

```

---

### 프로젝트 후기

## 주요 배운 점:

- 스타일의 일관성 중요성
  
  디자인의 여백, 행간 등의 요소가 일관되지 않으면 퍼블리싱 과정에서 문제를 초래할 수 있음을 경험했습니다.
  
- 디자인의 영향력
  
  잘 구성된 디자인이 내용 전달에 큰 도움이 된다는 것을 알게 되었습니다.
 

## 개선된 디자인 능력:

- 다양한 스타일을 조화롭게 통합하는 능력
  
- 퍼블리싱 과정에서의 잠재적 문제를 사전에 인지하고 해결하는 능력
  
- 내용 전달을 돕는 효과적인 디자인 구성 능력

<a href="https://minseong0000.github.io/Alpina/" target="_blank">프로토타입 바로가기</a>

