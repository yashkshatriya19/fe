import type { Transaction } from "./types";
import "./style.css";
const transactionList = document.querySelector<HTMLTableSectionElement>(".transaction-list tbody");
const form = document.querySelector<HTMLFormElement>(".transaction-form form");
const transactions: Transaction[] = [
    {
        id: 1,
        title: "Lunch",
        amount: 100,
        category: "food",
        date: "2022-01-01",
        payment: "cash",
    },
    {
        id: 2,
        title: "Dinner",
        amount: 200,
        category: "food",
        date: "2022-01-02",
        payment: "cash",
    },
    {
        id: 3,
        title: "Travel",
        amount: 300,
        category: "travel",
        date: "2022-01-03",
        payment: "cash",
    },
    {
        id: 4,
        title: "Shopping",
        amount: 400,
        category: "shopping",
        date: "2022-01-04",
        payment: "cash",
    },
    {
        id: 5,
        title: "Bills",
        amount: 500,
        category: "bills",
        date: "2022-01-05",
        payment: "cash",
    }
]
console.log(transactions);

// Validate transactions
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector<HTMLInputElement>("#title")?.value || "";
  const amount = document.querySelector<HTMLInputElement>("#amount")?.value ||"";
  const category = document.querySelector<HTMLSelectElement>("#category")?.value || "";
  const date = document.querySelector<HTMLInputElement>("#date")?.value || "";
  const payment = document.querySelector<HTMLSelectElement>("#payment")?.value || "";
  const notes = document.querySelector<HTMLTextAreaElement>("#notes")?.value || "";
  // Validation
  let isValid = true;

  // Title validation
  let titleError=document.querySelector<HTMLElement>("#titleError");
  if(!titleError){
    return;
  }
  if (title === "") {
    titleError.textContent = "Title cannot be empty";
    isValid = false;
  }
  else if (title.length < 3) {
      titleError.textContent = "Title must be at least 3 characters long";
      isValid = false;
  }
  else if (title.length > 20) {
      titleError.textContent = "Title cannot be longer than 20 characters";
      isValid = false;
  }
  else if (!/^[a-zA-Z\s]+$/.test(title)) {
      titleError.textContent = "Title can only contain letters and spaces";
      isValid = false;
  }
  else {
      titleError.textContent = "";
  }
  
  // Amount validation
  let amountError=document.querySelector<HTMLElement>("#amountError");
  if(!amountError){
    return;
  }
  if (amount === "") {
      amountError.textContent = "Amount cannot be empty";
      isValid = false;
  }
  else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      amountError.textContent = "Amount must be a number greater than 0";
      isValid = false;
  }
  else {
      amountError.textContent = "";
  }
  // Category validation
  let categoryError = document.querySelector<HTMLElement>("#categoryError");
  if(!categoryError){
    return;
  }
  if (category === "") {
      categoryError.textContent = "Category cannot be empty";
      isValid = false;
  }
  else if (category !== "food" && category !== "travel" && category !== "shopping" && category !== "bills" && category !== "salary") {
      categoryError.textContent = "Category must be one of 'food', 'travel', 'shopping', 'bills', or 'salary'";
      isValid = false;
  }
  else {
      categoryError.textContent = "";
  }
  // Date validation
  let dateError = document.querySelector<HTMLElement>("#dateError");
  if(!dateError){
    return;
  }
  if (date === "") {
      dateError.textContent = "Date cannot be empty";
      isValid = false;
  }
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      dateError.textContent = "Date must be in the format YYYY-MM-DD";
      isValid = false;
  }
  else {
      dateError.textContent = "";
  }
  // Payment validation
  let paymentError = document.querySelector<HTMLElement>("#paymentError");
  if(!paymentError){
    return;
  }
  if (payment === "") {
      paymentError.textContent = "Payment cannot be empty";
      isValid = false;
  }
  else if (payment !== "cash" && payment !== "card" && payment !== "upi") {
      paymentError.textContent = "Payment must be one of 'cash', 'card', or 'upi'";
      isValid = false;
  }
  else {
      paymentError.textContent = "";
  }
  if (isValid) {
      const transaction: Transaction = {
          id: Date.now(),
          title: title,
          amount: Number(amount),
          category: category as Transaction["category"],
          date: date,
          payment: payment as Transaction["payment"],
          notes: notes,
      };
      transactions.push(transaction);
      renderTransactionList(transactions);
      form.reset();
  }
});
// Render transaction list
function renderTransactionList(transactions: Transaction[]) 
{
  if(transactionList){
    if(transactions.length === 0){
      transactionList.innerHTML = "<tr><td colspan='7'>No transactions found</td></tr>";
    }
    else{
    transactionList.innerHTML = "";
    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.title}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
            <td>${transaction.payment}</td>
            <td>${transaction.notes || "No notes"}</td>
            <td>
              <button class="delete-btn" data-id="${transaction.id}">Delete</button>
            </td>
        `;
        transactionList.appendChild(row);
        
          console.log("No transactions found");
        
    });}
  }
}
// Edit and Delete functions
transactionList?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) {
        return;
    }
  const id = event.target.dataset.id;
  if(!id){ 
    return;
  }
  if (event.target.classList.contains("delete-btn")) {
    const transactionId = parseInt(id);
    const confirmDelete = confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      const index = transactions.findIndex((t) => t.id === transactionId);
      transactions.splice(index, 1);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderTransactionList(transactions);
    }
  }
});
renderTransactionList(transactions);
