// =============================
// UNIVERSAL VALIDATION HELPERS
// =============================

// Checks if a value is empty or just whitespace
// Returns true if the input is null, empty, or only spaces
function isEmpty(value) {
  return !value || value.trim() === "";
}

// Displays an error message under a specific input field
// Adds Bootstrap's "is-invalid" class and injects an error <div> if missing
function showError(input, message) {
  input.classList.add("is-invalid"); // Adds red border + error styling

  // Check if an error message already exists as the next sibling
  let msg = input.nextElementSibling;
  if (!msg || !msg.classList.contains("invalid-feedback")) {
    // Create new error message container if not already present
    msg = document.createElement("div");
    msg.classList.add("invalid-feedback");
    input.insertAdjacentElement("afterend", msg); // Insert below input
  }

  msg.textContent = message; // Insert actual error text
}

// Removes error styling + error message for a given input
function clearError(input) {
  input.classList.remove("is-invalid"); // Remove red border

  let msg = input.nextElementSibling;
  // If the next sibling is an error message, remove it
  if (msg && msg.classList.contains("invalid-feedback")) msg.remove();
}

// Shows success styling + optional success feedback message under input
function Success(input, message) {
  input.classList.add("is-valid"); // Adds green border + success styling

  // Check whether a success message already exists
  let msg = input.nextElementSibling;
  if (!msg || !msg.classList.contains("valid-feedback")) {
    // Create <div> for success message
    msg = document.createElement("div");
    msg.classList.add("valid-feedback");
    input.parentNode.insertBefore(msg, input.nextElementSibling);
  }

  // Apply message or fallback text
  msg.textContent = message || "Looks great!";
}

// =============================
// NEWSLETTER VALIDATION
// =============================

// Handles newsletter email validation when clicking "Subscribe"
function initNewsletterValidation() {
  const emailInput = document.getElementById("newsletterEmail");
  const subscribeBtn = document.getElementById("subscribeBtn");

  // Exit if newsletter elements not present on page
  if (!emailInput || !subscribeBtn) return;

  subscribeBtn.addEventListener("click", () => {
    // Uses built-in HTML5 email format validation
    if (!emailInput.checkValidity()) {
      showError(emailInput, "Please enter a valid email address.");
      alert("Email Address Provided is Invalid.");
      return;
    }

    clearError(emailInput); // Remove previous errors if any
    alert("Thank you for subscribing to our newsletter!");
  });
}

// =============================
// SHIPPING PAGE VALIDATION
// =============================

// Validates the full shipping form before continuing to payment
function initShippingValidation() {
  const form = document.querySelector("#shippingDetailsForm");
  if (!form) return; // Do nothing if this form isn’t on the page

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop submission until validation completes
    let valid = true; // Master flag for overall form validity

    // Gather input references
    const first = document.getElementById("firstName");
    const last = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const postal = document.getElementById("postal");
    const phone = document.getElementById("phone");
    const country = document.getElementById("country");

    // FIRST NAME validation
    // Checks empty -> format -> success
    if (isEmpty(first.value)) {
      showError(first, "First name required");
      valid = false;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/.test(first.value.trim())) {
      showError(first, "First name must be 2-50 letters");
      valid = false;
    } else {
      Success(first);
    }

    // LAST NAME validation
    if (isEmpty(last.value)) {
      showError(last, "Last name required");
      valid = false;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/.test(last.value.trim())) {
      showError(
        last,
        "Last name must be 2-50 letters and may include apostrophes or hyphens"
      );
      valid = false;
    } else {
      Success(last);
    }

    // ADDRESS validation
    if (isEmpty(address.value)) {
      showError(address, "Address required");
      valid = false;
    } else if (!/^[A-Za-z0-9\s,'-]{5,100}$/.test(address.value.trim())) {
      showError(
        address,
        "Address must be 5-100 characters, letters, numbers, commas, or hyphens"
      );
      valid = false;
    } else {
      Success(address);
    }

    // CITY validation
    if (isEmpty(city.value)) {
      showError(city, "City required");
      valid = false;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/.test(city.value.trim())) {
      showError(
        city,
        "City must be 2-50 letters and may include spaces, apostrophes, or hyphens"
      );
      valid = false;
    } else {
      Success(city);
    }

    // POSTAL CODE validation (allows 3-6 digits)
    if (isEmpty(postal.value)) {
      showError(postal, "Postal code required");
      valid = false;
    } else if (!/^[0-9]{3,6}$/.test(postal.value.trim())) {
      showError(postal, "Postal code must be 3-6 digits");
      valid = false;
    } else {
      Success(postal);
    }

    // PHONE NUMBER validation
    if (isEmpty(phone.value)) {
      showError(phone, "Phone number required");
      valid = false;
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone.value.trim())) {
      showError(
        phone,
        "Phone must be 7-15 digits, may include +, spaces, or hyphens"
      );
      valid = false;
    } else {
      Success(phone);
    }

    // COUNTRY selection (ensures user truly selects a value)
    if (country.value === "Choose country") {
      showError(country, "Please select a country");
      valid = false;
    } else {
      Success(country);
    }

    // SHIPPING METHOD radio button validation
    const shipping = document.querySelector('input[name="shipping"]:checked');
    if (!shipping) {
      alert("Please select a shipping option.");
      valid = false;
    }

    // If all validation passes → allow navigation to payment page
    if (valid) window.location.href = "payment.html";
  });
}

// =============================
// PAYMENT PAGE VALIDATION
// =============================

// Handles all payment-related validation logic
function initPaymentValidation() {
  const form = document.querySelector("#paymentForm");
  const payCard = document.getElementById("pay-card");
  const cardFields = document.getElementById("credit-card-fields");

  if (!form) return; // Skip if this page does not contain the payment form

  // Toggles credit card input visibility depending on payment option
  payCard?.addEventListener("change", () => {
    cardFields.style.display = payCard.checked ? "block" : "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent immediate submission
    let valid = true;

    // Ensure any payment method is selected
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!selected) {
      alert("Please select a payment method.");
      return;
    }

    // If credit card is selected, validate card fields
    if (payCard.checked) {
      const num = document.getElementById("cardNumber");
      const expiry = document.getElementById("cardExpiry");
      const cvv = document.getElementById("cardCVV");
      const holder = document.getElementById("cardName");

      // CARD NUMBER: must be exactly 16 digits
      if (isEmpty(num.value)) {
        showError(num, "Card number is required");
        valid = false;
      } else if (!/^\d{16}$/.test(num.value.replace(/\s/g, ""))) {
        showError(num, "Invalid card number");
        valid = false;
      } else clearError(num);

      // EXPIRY DATE: must follow MM/YY pattern
      if (isEmpty(expiry.value)) {
        showError(expiry, "Expiry date is required");
        valid = false;
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value)) {
        showError(expiry, "Use MM/YY format");
        valid = false;
      } else clearError(expiry);

      // CVV: 3–4 digits only
      if (isEmpty(cvv.value)) {
        showError(cvv, "CVV is required");
        valid = false;
      } else if (!/^\d{3,4}$/.test(cvv.value)) {
        showError(cvv, "Invalid CVV");
        valid = false;
      } else clearError(cvv);

      // CARDHOLDER NAME: cannot be blank
      if (isEmpty(holder.value)) {
        showError(holder, "Cardholder name required");
        valid = false;
      } else clearError(holder);
    }

    // If all validations passed, show success message
    if (valid) {
      const successMsg = document.createElement("div");
      successMsg.classList.add("alert", "alert-success", "mt-3");
      successMsg.textContent = "All information looks correct! Redirecting...";
      form.prepend(successMsg);

      // Brief delay so user sees message
      setTimeout(() => {
        window.location.href = "paymentSuccess.html";
      }, 1000);
    }
  });
}

// =============================
// INITIALIZE VALIDATION ON PAGE LOAD
// =============================

// Automatically initializes all relevant validators when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initNewsletterValidation();
  initShippingValidation();
  initPaymentValidation();
});
