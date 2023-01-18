//firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuMpIAFiBZH7-FpaM7Ckc6p9EhfKJLLAI",
  authDomain: "login-and-register-8ea00.firebaseapp.com",
  projectId: "login-and-register-8ea00",
  storageBucket: "login-and-register-8ea00.appspot.com",
  messagingSenderId: "57367879378",
  appId: "1:57367879378:web:bda9f0a94bce68608c570b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const registerUser = () => {
  //register inputs
  const regName = document.getElementById("registerName");
  const regEmail = document.getElementById("registerEmail");
  const regDate = document.getElementById("registerDOB");
  const regPassword = document.getElementById("registerPassword");
  const regCPassword = document.getElementById("registerCPassword");

  if (!validateEmail(regEmail.value))
    showAlert("Invalid Email", "Please enter a valid email address", "info");
  else if (!validatePassword(regPassword.value))
    showAlert("Invalid Password", "Please enter a valid password", "info");
  else if (regPassword.value != regCPassword.value)
    showAlert("Invalid Password", "Both passwords must be same", "info");
  else {
    createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value)
      .then(() => {
        const user = auth.currentUser;

        //add user to database
        set(ref(database, "users/" + user.uid), {
          name: regName.value,
          email: regEmail.value,
          date: regDate.value,
        });
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        showAlert(errorCode, errorMessage, "danger");
      });
  }
};

const loginUser = () => {
  //login inputs
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  if (!validateEmail(loginEmail.value))
    showAlert("Invalid Email", "Please enter a valid email address", "info");
  else if (!validatePassword(loginPassword.value))
    showAlert("Invalid Password", "Please enter a valid password", "info");
  else {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then(() => {
        const user = auth.currentUser;

        onValue(ref(database, "users/" + user.uid), (snapshot) => {
          const data = snapshot.val();
          const fullName = data.name;
          const userEmail = data.email;
          const userDOB = data.date;
          console.log(fullName, userEmail, userDOB);
          localStorage.setItem("uName", fullName);
          localStorage.setItem("uEmail", userEmail);
          localStorage.setItem("uDate", userDOB);
        });
        showAlert("Please Wait", "Signing In", "info");
        setTimeout(() => {
          window.location.href = "../../dashboard.html";
        }, 3000);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        showAlert(errorCode, errorMessage, "danger");
      });
  }
};

const validateEmail = (email) => /^[^@]+@\w+(\.\w+)+\w$/.test(email);

const validatePassword = (password) => (password.length > 6 ? true : false);

const showAlert = (title, message, type) => {
  let id = 1;
  const alertContainer = document.querySelector(".alert-container");
  const html = `
    <div class="alert alert-${type} alert-dismissible fade show mt-md-5 col-sm-4" id="new-alert-${id}" role="alert">
      <strong>${title}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alertContainer.insertAdjacentHTML("afterbegin", html);
  const ele = document.getElementById(`new-alert-${id}`);
  id++;
  const myAlert = new bootstrap.Alert(ele);
  setTimeout(function () {
    myAlert.close();
  }, 3000);
};
//initialize login and register buttons
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("signupBtn");

loginBtn.addEventListener("click", () => {
  loginUser();
});
registerBtn.addEventListener("click", () => {
  registerUser();
});
