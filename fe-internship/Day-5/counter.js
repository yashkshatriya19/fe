const count = document.querySelector("#count");
const button = document.querySelector("#increase");

let value = 0;

button.addEventListener("click", function () {
    value++;
    count.textContent = value;
});