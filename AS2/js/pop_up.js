// ===================== Add to Cart Popup =====================
document.getElementById("AddToCartBtn").addEventListener("click", function () {
  // Show success popup
  const popup = document.getElementById("cart-popup");
  popup.style.display = "flex";
  popup.style.opacity = 1;

  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = "none";
    }, 400);
  }, 2000);

  // Bounce cart icon
  const cartIcon = document.querySelector(".nav-cart a");
  cartIcon.classList.add("cart-bounce");

  setTimeout(() => {
    cartIcon.classList.remove("cart-bounce");
  }, 500);
});
