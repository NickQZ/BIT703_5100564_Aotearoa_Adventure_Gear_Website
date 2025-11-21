document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const subtotalEl = document.getElementById("subtotal");
  const shippingCostEl = document.getElementById("shipping-cost");
  const totalEl = document.getElementById("total");
  const freeShippingMsg = document.getElementById("free-shipping-msg");

  let subtotal = parseFloat(subtotalEl.textContent.replace(/[\$,]/g, ""));
  let taxes = 130;

  const shippingOptions = document.querySelectorAll('input[name="shipping"]');

  function updateTotal() {
    let shippingCost = 0;
    let selected = document.querySelector(
      'input[name="shipping"]:checked'
    ).value;

    if (subtotal > 600) {
      shippingCostEl.textContent = "FREE";
      freeShippingMsg.style.display = "block";
      shippingCost = 0;
    } else {
      freeShippingMsg.style.display = "none";
      if (selected === "next-day")
        shippingCost = 20; // Next Day Shipping has been selected
      else shippingCost = 0;
      shippingCostEl.textContent =
        shippingCost === 0 ? "FREE" : `$${shippingCost}`;
    }

    totalEl.textContent = `$${(
      subtotal +
      taxes +
      shippingCost
    ).toLocaleString()}`;
  }

  shippingOptions.forEach((option) => {
    option.addEventListener("change", updateTotal);
  });

  // Initial total update
  updateTotal();
});
