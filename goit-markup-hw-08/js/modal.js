const modal = document.getElementById("modal");
const btnNav = document.getElementById("modalBtn");
const btnIntro = document.getElementById("modalButton");
const span = document.getElementsByClassName("close")[0];

btnNav.onclick = function() {
  modal.style.display = "block";
}

btnIntro.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
