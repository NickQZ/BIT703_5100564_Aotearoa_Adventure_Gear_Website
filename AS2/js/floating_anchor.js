document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("scrollToFeatured");

  btn.style.display = "none"; // hide initially

  window.addEventListener("scroll", () => {
    if (window.scrollY > 650) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
});
