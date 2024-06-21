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
