document.addEventListener("DOMContentLoaded", () => {
  const creditCardRadio = document.getElementById("pay-card");
  const creditCardFields = document.getElementById("credit-card-fields");
  const paypalRadio = document.getElementById("payPal");

  // Select ALL payment radio buttons
  const paymentRadios = document.querySelectorAll('input[name="payment"]');

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Show/hide credit card fields
      if (creditCardRadio.checked) {
        creditCardFields.style.display = "block";
      } else {
        creditCardFields.style.display = "none";
      }

      // PayPal alert/modal
      if (paypalRadio && paypalRadio.checked) {
        alert(
          "You have selected PayPal as your payment method. You will be redirected to our PayPal gateway to complete this transaction."
        );
      }
    });
  });
});
