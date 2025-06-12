
// === DOM SELECTION ===
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const orderNo = document.getElementById('order-no');
const productCode = document.getElementById('product-code');
const quantity = document.getElementById('quantity');
const complaintsGroup = document.querySelectorAll('#complaints-group input[type="checkbox"]');
const complaintDescription = document.getElementById('complaint-description');
const solutionsGroup = document.querySelectorAll('#solutions-group input[type="radio"]');
const solutionDescription = document.getElementById('solution-description');
const form = document.getElementById('form');

// === VALIDATION FUNCTION ===
function validateForm() {
  const isFullNameValid = fullName.value.trim() !== "";

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

  const isOrderNoValid = /^2024\d{6}$/.test(orderNo.value); // must start with 2024 and be 10 digits

  const isProductCodeValid = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}$/.test(productCode.value);

  const isQuantityValid = Number(quantity.value) > 0;

  const isComplaintSelected = Array.from(complaintsGroup).some(cb => cb.checked);

  const isComplaintDescValid = document.getElementById('other-complaint').checked
    ? complaintDescription.value.trim().length >= 20
    : true;

  const isSolutionSelected = Array.from(solutionsGroup).some(rb => rb.checked);

  const isSolutionDescValid = document.getElementById('other-solution').checked
    ? solutionDescription.value.trim().length >= 20
    : true;

  // Return an object with true/false for each validation
  return {
    "full-name": isFullNameValid,
    "email": isEmailValid,
    "order-no": isOrderNoValid,
    "product-code": isProductCodeValid,
    "quantity": isQuantityValid,
    "complaints-group": isComplaintSelected,
    "complaint-description": isComplaintDescValid,
    "solutions-group": isSolutionSelected,
    "solution-description": isSolutionDescValid
  };
}

// === VALIDITY CHECKER FUNCTION ===
function isValid(validationResult) {
  for (const key in validationResult) {
    if (validationResult[key] === false) {
      return false;
    }
  }
  return true;
}

// === HIGHLIGHT FIELDS BASED ON VALIDATION ===
function highlightFields(validationResult) {
  // Text inputs
  fullName.style.borderColor = validationResult["full-name"] ? 'green' : 'red';
  email.style.borderColor = validationResult["email"] ? 'green' : 'red';
  orderNo.style.borderColor = validationResult["order-no"] ? 'green' : 'red';
  productCode.style.borderColor = validationResult["product-code"] ? 'green' : 'red';
  quantity.style.borderColor = validationResult["quantity"] ? 'green' : 'red';

  // Checkbox group → highlight fieldset
  document.getElementById('complaints-group').style.borderColor = validationResult["complaints-group"] ? 'green' : 'red';

  // Description (only red if needed)
  complaintDescription.style.borderColor = validationResult["complaint-description"] ? 'green' : 'red';

  // Radio group → highlight fieldset
  document.getElementById('solutions-group').style.borderColor = validationResult["solutions-group"] ? 'green' : 'red';

  // Solution description
  solutionDescription.style.borderColor = validationResult["solution-description"] ? 'green' : 'red';
}

// === EVENT LISTENER FOR FORM SUBMISSION ===
form.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent form from submitting/reloading

  const result = validateForm();

  if (!isValid(result)) {
    highlightFields(result);
  } else {
    alert("Form submitted successfully!");
    form.reset();
  }
});

// === EVENT LISTENERS FOR CHANGE (LIVE FEEDBACK) ===

// Validate each text field on change
fullName.addEventListener('change', () => {
  fullName.style.borderColor = fullName.value.trim() !== "" ? 'green' : 'red';
});

email.addEventListener('change', () => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  email.style.borderColor = isValidEmail ? 'green' : 'red';
});

orderNo.addEventListener('change', () => {
  orderNo.style.borderColor = /^2024\d{6}$/.test(orderNo.value) ? 'green' : 'red';
});

productCode.addEventListener('change', () => {
  const pattern = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}$/;
  productCode.style.borderColor = pattern.test(productCode.value) ? 'green' : 'red';
});

quantity.addEventListener('change', () => {
  quantity.style.borderColor = Number(quantity.value) > 0 ? 'green' : 'red';
});

// Complaint checkboxes: update fieldset color
complaintsGroup.forEach(cb => {
  cb.addEventListener('change', () => {
    const isChecked = Array.from(complaintsGroup).some(c => c.checked);
    document.getElementById('complaints-group').style.borderColor = isChecked ? 'green' : 'red';
  });
});

// Complaint description
complaintDescription.addEventListener('change', () => {
  const isValidDesc = !document.getElementById('other-complaint').checked ||
    complaintDescription.value.trim().length >= 20;
  complaintDescription.style.borderColor = isValidDesc ? 'green' : 'red';
});

// Solution radios: update fieldset color
solutionsGroup.forEach(rb => {
  rb.addEventListener('change', () => {
    const isSelected = Array.from(solutionsGroup).some(r => r.checked);
    document.getElementById('solutions-group').style.borderColor = isSelected ? 'green' : 'red';
  });
});

// Solution description
solutionDescription.addEventListener('change', () => {
  const isValidDesc = !document.getElementById('other-solution').checked ||
    solutionDescription.value.trim().length >= 20;
  solutionDescription.style.borderColor = isValidDesc ? 'green' : 'red';
});

