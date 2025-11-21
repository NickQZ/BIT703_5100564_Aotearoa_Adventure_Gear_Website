document.addEventListener("DOMContentLoaded", () => {
  // Create your own carousel instance
  const carouselElement = document.getElementById("featuredProductsCarousel");
  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 4000,
    ride: false,
    pause: false,
    wrap: true,
  });

  // Hook up buttons
  document.getElementById("carouselPrev").addEventListener("click", () => {
    carousel.prev();
  });

  document.getElementById("carouselNext").addEventListener("click", () => {
    carousel.next();
  });

  setInterval(() => {
    carousel.next();
  }, 4000);
});
