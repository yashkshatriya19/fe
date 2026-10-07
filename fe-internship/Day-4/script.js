// student = {
//     name: "John Doe",
//     age: 20,
//     marks:80
// }
// function getGrades(marks){
//     if(marks>90){
//         return "A";
//     }
//     else if(marks>80){
//         return "B";
//     }
//     else if(marks>70){
//         return "C";
//     }
//     else if(marks>60){
//         return "D";
//     }
//     else{
//         return "F";
//     }
// }
// for (let key in student){
//     if(key === "marks"){
//         let grade=getGrades(student[key]);
//         console.log("Grade: " + grade);
//         if(grade==='F'){
//             console.log("Result: Failed");
//         }
//         else{
//             console.log("Result: Passed");
//         }
//     }
//     console.log(key + ": " + student[key]);
    
// }

// function counter(){
//     let count=0;
//     return function(){
//         count++;
//         return count;
//     }
// }
// const count=counter();
// console.log(count());
// console.log(count());
// console.log(count());

// class BankAccount{
//     #balance=0
//     // constructor(){
//     //     this.#balance=0;
//     // }
//     deposit(amount){
//         if(amount>0){
//             this.#balance+=amount;
//             console.log(`Deposited: ${amount}. New balance: ${this.#balance}`);
//         }
//         else{
//             console.log("Deposit amount must be positive.");
            
//         }
//     }   
//     withdraw(amount){
//         if(amount>0 && amount<=this.#balance){
//             this.#balance-=amount;
//             console.log(`Withdrew: ${amount}. New balance: ${this.#balance}`);
//         }
//         else{
//             console.log("Invalid withdrawal amount.");
//         }
//     }
//     getBalance(){
//         return this.#balance;
//     }


// }
// const account=new BankAccount();
// account.deposit(100);
// account.withdraw(50);
// console.log(`Current balance: ${account.getBalance()}`);

// const employees = [
//     { name: "Yash", salary: 50000, department: "IT" },
//     { name: "Rahul", salary: 40000, department: "HR" },
//     { name: "Amit", salary: 60000, department: "IT" },
//     { name: "Priya", salary: 45000, department: "Finance" }
// ];
// let totalSalary = 0;
// for (let employee of employees) {
//     if (employee.department === "IT") {
//         console.log(`Employee: ${employee.name}, Salary: ${employee.salary}`);
//     }
//     if(employee.salary > 45000){
//         console.log(`High Salary Employee: ${employee.name}, Salary: ${employee.salary}`);
//     }
//     totalSalary += employee.salary;
//     for (let [key, value] of Object.entries(employee)) {
//         console.log(key, value);
//     }
// }
// console.log(`Total Salary: ${totalSalary}`);
