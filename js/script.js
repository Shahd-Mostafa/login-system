var upUsername = document.getElementById("signUpName");
var upEmail = document.getElementById("signUpEmail");
var upPassword = document.getElementById("signUpPassword");
var upConfirmPassword = document.getElementById("signUpConfirmPassword");
var upTogglePassword = document.querySelector(".password-toggle-icon i");
var upTogglePassword2 = document.querySelector(".password-toggle-icon2 i");
var inEmail = document.getElementById("signInEmail");
var inPassword = document.getElementById("signInPassword");
var inTogglePassword = document.querySelector(
  ".sign-in-password-toggle-icon i"
);
var signUpArr = [];

var path = location.pathname.split("/");
var url = window.location.origin;
for (var i = 0; i < path.length - 1; i++) {
  url += "/" + path[i];
}

if (localStorage.getItem("users") == null) {
  signUpArr = [];
} else {
  signUpArr = JSON.parse(localStorage.getItem("users"));
}

function signUpActive() {
  event.preventDefault();
  validateSignUpInputs();
}
function signInActive() {
  event.preventDefault();
  validateSignInInputs();
}

function displayError(element, message) {
  var errorControl = element.parentElement;
  let errorDisplay = errorControl.querySelector(".error");
  if (!errorDisplay) {
    errorDisplay = document.createElement("div");
    errorDisplay.className = "error";
    errorControl.appendChild(errorDisplay);
  }
  errorDisplay.innerText = message;
  errorControl.classList.add("error");
  errorControl.classList.remove("success");
}

function displaySuccess(element) {
  var errorControl = element.parentElement;
  var errorDisplay = errorControl.querySelector(".error");
  if (errorDisplay) {
    errorControl.removeChild(errorDisplay);
  }
  errorControl.classList.add("success");
  errorControl.classList.remove("error");
}

function isValidEmail(email) {
  var emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
  return emailReg.test(String(email).toLowerCase());
}

function isValidUserName(username) {
  var usernameReg = /^[A-Z][a-zA-Z0-9]*$/;
  if (usernameReg.test(username)) {
    return true;
  }
}

function isEmailExist() {
  for (var i = 0; i < signUpArr.length; i++) {
    if (signUpArr[i].signUpEmail.toLowerCase() == upEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function validateSignUpInputs() {
  var usernameValue = upUsername.value.trim();
  var emailValue = upEmail.value.trim();
  var passwordValue = upPassword.value.trim();
  var confirmPasswordValue = upConfirmPassword.value.trim();

  var validSignUp = true;

  if (usernameValue === "") {
    displayError(upUsername, "Username is required");
    validSignUp = false;
  } else if (!isValidUserName(usernameValue)) {
    displayError(upUsername, "Username should start with a capital letter");
    validSignUp = false;
  } else {
    displaySuccess(upUsername);
  }

  if (emailValue === "") {
    displayError(upEmail, "Email is required");
    validSignUp = false;
  } else if (!isValidEmail(emailValue)) {
    displayError(upEmail, "Provide a valid email address");
    validSignUp = false;
  } else if (isEmailExist(emailValue)) {
    displayError(upEmail, "Email already exists");
    validSignUp = false;
  } else {
    displaySuccess(upEmail);
  }

  if (passwordValue === "") {
    displayError(upPassword, "Password is required");
    validSignUp = false;
  } else if (passwordValue.length < 8) {
    displayError(upPassword, "Password must be at least 8 characters");
    validSignUp = false;
  } else {
    displaySuccess(upPassword);
  }

  if (confirmPasswordValue === "") {
    displayError(upConfirmPassword, "Please confirm your password");
    validSignUp = false;
  } else if (confirmPasswordValue !== passwordValue) {
    displayError(upConfirmPassword, "Passwords do not match");
    validSignUp = false;
  } else {
    displaySuccess(upConfirmPassword);
  }

  if (validSignUp) {
    signUp();
  }
}
function validateSignInInputs() {
  var emailValue = inEmail.value.trim();
  var passwordValue = inPassword.value.trim();
  var validSignIn = true;
  if (emailValue === "") {
    displayError(inEmail, "Email is required");
    validSignIn = false;
  } else if (!isValidEmail(emailValue)) {
    displayError(inEmail, "Provide a valid email address");
    validSignIn = false;
  } else {
    displaySuccess(inEmail);
  }
  if (passwordValue === "") {
    displayError(inPassword, "Password is required");
    validSignIn = false;
  } else {
    displaySuccess(inPassword);
  }
  if (validSignIn) {
    signIn();
  }
}
function signUp() {
  var newUser = {
    signUpName: upUsername.value,
    signUpEmail: upEmail.value,
    signUpPassword: upPassword.value,
  };
  signUpArr.push(newUser);
  localStorage.setItem("users", JSON.stringify(signUpArr));
  alert("Sign up successful");
  reset();
  document
    .querySelectorAll(".success")
    .forEach((control) => control.classList.remove("success"));
}
function reset() {
  upUsername.value = "";
  upEmail.value = "";
  upPassword.value = "";
  upConfirmPassword.value = "";
}

// function signIn() {
//   var emailValue = inEmail.value;
//  var passwordValue = inPassword.value;
//   for (var i = 0; i < signUpArr.length; i++) {
//     if (
//       signUpArr[i].signUpEmail.toLowerCase() == emailValue.toLowerCase() &&
//       signUpArr[i].password.toLowerCase() == passwordValue.toLowerCase()
//     ) {
//       localStorage.setItem("sessionUsername", signUpArr[i].signUpName);
//       if (url == "/") {
//         location.replace("https://" + location.hostname + "/home.html");
//       } else {
//         location.replace(url + "/home.html");
//       }
//     } else {
//       document.getElementById("invalid").innerHTML =
//         '<span class="p-2 text-danger">incorrect email or password</span>';
//     }
//   }
// }
function signIn() {
  var emailValue = inEmail.value;
  var passwordValue = inPassword.value;
  var isValidUser = false;
  for (var i = 0; i < signUpArr.length; i++) {
    if (
      signUpArr[i].signUpEmail.toLowerCase() == emailValue.toLowerCase() &&
      signUpArr[i].signUpPassword.toLowerCase() == passwordValue.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", signUpArr[i].signUpName);
      isValidUser = true;
      break;
    }
  }
  if (isValidUser) {
    if (url == "/") {
      location.replace("https://" + location.hostname + "/home.html");
    } else {
      location.replace(url + "/home.html");
    }
  } else {
    inEmail.parentElement.classList.add("error");
    inPassword.parentElement.classList.add("error");
    document.getElementById("invalid").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password</span>';
  }
}
var sessionUserName = localStorage.getItem("sessionUsername");
if (sessionUserName) {
  document.getElementById("username").innerHTML = "Welcome " + sessionUserName;
}
// password eye
// sign up eye
function upTogglePasswordFirst() {
  if (upPassword.type === "password" && upPassword.value !== "") {
    upPassword.type = "text";
    upTogglePassword.classList.remove("fa-eye-slash");
    upTogglePassword.classList.add("fa-eye");
  } else {
    upPassword.type = "password";
    upTogglePassword.classList.add("fa-eye-slash");
    upTogglePassword.classList.remove("fa-eye");
  }
}

function upTogglePasswordConfirm() {
  if (upConfirmPassword.type === "password" && upConfirmPassword.value !== "") {
    upConfirmPassword.type = "text";
    upTogglePassword2.classList.remove("fa-eye-slash");
    upTogglePassword2.classList.add("fa-eye");
  } else {
    upConfirmPassword.type = "password";
    upTogglePassword2.classList.add("fa-eye-slash");
    upTogglePassword2.classList.remove("fa-eye");
  }
}
// password eye
// sign in eye
function inToggle() {
  if (inPassword.type === "password" && inPassword.value !== "") {
    inPassword.type = "text";
    inTogglePassword.classList.remove("fa-eye-slash");
    inTogglePassword.classList.add("fa-eye");
  } else {
    inPassword.type = "password";
    inTogglePassword.classList.add("fa-eye-slash");
    inTogglePassword.classList.remove("fa-eye");
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
