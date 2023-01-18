const setName = document.getElementById("uName");
const setEmail = document.getElementById("uEmail");
const setDOB = document.getElementById("uDOB");
const backBtn = document.getElementById("backBtn");

const updateData = () => {
  setName.textContent = localStorage.getItem("uName");
  setEmail.textContent = localStorage.getItem("uEmail");
  setDOB.textContent = localStorage.getItem("uDate");
};

backBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../../index.html";
});
