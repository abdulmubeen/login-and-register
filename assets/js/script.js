//switch between login and signup forms

const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

registerLink.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

loginLink.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});
