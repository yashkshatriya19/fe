// const p = document.createElement("p");

// p.textContent = "Hello JavaScript";

// document.body.append(p);
// const button = document.querySelector("button");

// button.classList.add("active");
const user = {
    name: "Yash",
    age: 21
};

localStorage.setItem(
    "user",
    JSON.stringify(user)
);

const data = localStorage.getItem("user");

const savedUser = JSON.parse(data);

console.log(savedUser.name);