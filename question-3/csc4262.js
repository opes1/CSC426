// =============================================
//  CSC426 Login App - JavaScript Logic
// =============================================


// --- Valid login credentials ---
// In a real app, this would come from a database
var VALID_USERNAME = "admin";
var VALID_PASSWORD = "csc426";


// =============================================
//  FUNCTION 1: login
//  Runs when user clicks the Login button
// =============================================
function login() {

  // Get what the user typed
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value.trim();
  var rememberMe = document.getElementById("rememberMe").checked;

  // Step 1 — Hide any previous messages
  hideMessages();

  // Step 2 — Validate inputs (check if empty)
  var isValid = validateInputs(username, password);

  // Step 3 — If validation failed, stop here
  if (!isValid) return;

  // Step 4 — Check if credentials are correct
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {

    // Save username if Remember Me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    // Save logged in user for dashboard to use
    localStorage.setItem("loggedInUser", username);

    // Show success message
    showSuccess();

    // Redirect to dashboard after 2 seconds
    setTimeout(function () {
      window.location.href = "csc4262(welcome).html";
    }, 2000);

  } else {
    // Wrong credentials — show error message
    showError("Invalid username or password. Please try again.");
  }
}


// =============================================
//  FUNCTION 2: validateInputs
//  Checks that username and password are not empty
// =============================================
function validateInputs(username, password) {

  var isValid = true;

  // Check username
  if (username === "") {
    // Show error below username field
    document.getElementById("usernameError").classList.add("active");
    document.querySelector("#username").parentElement.classList.add("invalid");
    isValid = false;
  }

  // Check password
  if (password === "") {
    // Show error below password field
    document.getElementById("passwordError").classList.add("active");
    document.querySelector("#password").parentElement.classList.add("invalid");
    isValid = false;
  }

  return isValid;
}


// =============================================
//  FUNCTION 3: resetForm
//  Runs when user clicks Reset button
// =============================================
function resetForm() {

  // Clear all input fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("rememberMe").checked = false;

  // Hide all messages and errors
  hideMessages();
  clearFieldErrors();
}


// =============================================
//  FUNCTION 4: togglePassword
//  Shows or hides the password text
// =============================================
function togglePassword() {

  var passwordInput = document.getElementById("password");
  var toggleBtn = document.getElementById("togglePassword");

  // If password is hidden, show it
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "🙈";  // change icon
  } else {
    // If password is visible, hide it
    passwordInput.type = "password";
    toggleBtn.textContent = "👁️";  // change icon back
  }
}


// =============================================
//  FUNCTION 5: forgotPassword
//  Shows the forgot password modal popup
// =============================================
function forgotPassword() {
  document.getElementById("modalOverlay").classList.add("active");
}


// =============================================
//  FUNCTION 6: closeModal
//  Closes the forgot password modal popup
// =============================================
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
}


// =============================================
//  HELPER: showError
//  Shows the red error message box
// =============================================
function showError(message) {
  document.getElementById("errorText").textContent = message;
  document.getElementById("errorMsg").classList.add("active");
}


// =============================================
//  HELPER: showSuccess
//  Shows the green success message box
// =============================================
function showSuccess() {
  document.getElementById("successMsg").classList.add("active");
}


// =============================================
//  HELPER: hideMessages
//  Hides both error and success message boxes
// =============================================
function hideMessages() {
  document.getElementById("errorMsg").classList.remove("active");
  document.getElementById("successMsg").classList.remove("active");
  clearFieldErrors();
}


// =============================================
//  HELPER: clearFieldErrors
//  Removes red borders and error texts on inputs
// =============================================
function clearFieldErrors() {
  document.getElementById("usernameError").classList.remove("active");
  document.getElementById("passwordError").classList.remove("active");
  document.querySelector("#username").parentElement.classList.remove("invalid");
  document.querySelector("#password").parentElement.classList.remove("invalid");
}


// =============================================
//  BONUS: Allow pressing Enter key to login
// =============================================
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    login();
  }
});


// =============================================
//  ON PAGE LOAD: Check if username was remembered
// =============================================
window.onload = function () {
  var remembered = localStorage.getItem("rememberedUser");
  if (remembered) {
    document.getElementById("username").value = remembered;
    document.getElementById("rememberMe").checked = true;
  }
};
