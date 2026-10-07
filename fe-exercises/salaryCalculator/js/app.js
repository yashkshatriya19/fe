import { employees } from "./employee.js";

const form = document.getElementById("form");
const employeeList = document.getElementById("employeesBody");
let editingEmployeeId = null;
const searchInput = document.getElementById("search");
const departmentFilter = document.getElementById("departmentFilter");
const ratingFilter = document.getElementById("ratingFilter");
const sortFilter = document.getElementById("sortFilter");

form.addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const ID = document.getElementById("ID").value.trim();
    const department = document.getElementById("department").value.trim();
    const designation = document.getElementById("designation").value.trim();
    let salary = document.getElementById("salary").value;
    const experience = document.getElementById("experience").value;
    let rating = document.getElementById("rating").value;
    // Validation
    let isValid = true;
    // Name validation
    const nameError = document.getElementById("nameError");
    if(name ===""){
        nameError.textContent = "Name cannot be empty";
        isValid = false;
    } else if(name.length < 3){
        nameError.textContent = "Name must be at least 3 characters long";
        isValid = false; 
    } else if(name.length > 20){
        nameError.textContent = "Name cannot be longer than 20 characters";
        isValid = false;
    } 
    else if(!/^[a-zA-Z\s]+$/.test(name)){
       nameError.textContent = "Name can only contain letters and spaces";
        isValid = false;
    }
    else{
        nameError.textContent = "";
    }

    // ID validation
    const idError = document.getElementById("idError");
    if(ID === ""){
        idError.textContent = "ID cannot be empty";
        isValid = false;
    }
    else if(!/^[0-9]+$/.test(ID)){
        idError.textContent = "ID must be a number";
        isValid = false;
    }
    else{
        idError.textContent = "";
    }

    // Department validation
    const departmentError = document.getElementById("departmentError");
    if(department === ""){
        departmentError.textContent = "Please select a department";
        isValid = false;
    }else{
        departmentError.textContent = "";
    }

    // Designation validation
    const designationError = document.getElementById("designationError");
    if(designation === ""){
        designationError.textContent = "Please enter a designation";
        isValid = false;
    }else if (!/^[a-zA-Z\s]+$/.test(designation)){
        designationError.textContent = "Designation can only contain letters and spaces";
        isValid = false;
    }
    else{
        designationError.textContent = "";
    }

    // Salary validation
    const salaryError = document.getElementById("salaryError");
    if (salary === ""){
        salaryError.textContent = "Please enter a salary";
        isValid = false;
    }else if(isNaN(salary) || salary <= 0){
        salaryError.textContent = "Salary must be a number greater than 0";
        isValid = false;
    }
    else{
        salaryError.textContent = "";
    }

    // Experience validation
    const experienceError = document.getElementById("experienceError");
    if (experience === ""){
        experienceError.textContent = "Please enter an experience";
        isValid = false;
    } else if(isNaN(experience) || experience < 0 || experience >= 50){
        experienceError.textContent = "Experience must be a number greater than 0 and less than 50";
        isValid = false;
    }
    else{
        experienceError.textContent = "";
    }

    // Rating validation
    const ratingError = document.getElementById("ratingError");
    if (rating === ""){
        ratingError.textContent = "Please enter a rating";
        isValid = false;
    } else if(isNaN(rating) || rating < 0 || rating > 5){
        ratingError.textContent = "Rating must be a number between 0 and 5";
        isValid = false;
    }
    else{
        ratingError.textContent = "";
    }
    salary = Number(salary);
    rating = Number(rating);
    const hra = calculateHra(salary);
    const da = calculateDa(salary);
    const bonus = calculateBonus(salary,rating);
    const grossSalary = calculateGrossSalary(salary,hra,da,bonus);
    const tax = calculateTax(grossSalary);
    const deductions = calculateDeductions(salary);
    const netSalary = calculateNetSalary(grossSalary,tax,deductions);
    if(isValid){
        const employee = {
            id: Date.now(),
            name: name,
            ID: ID,
            department: department,
            designation: designation,
            salary: salary,
            experience: experience,
            rating: rating,
            hra: hra,
            da: da,
            bonus: bonus,
            grossSalary: grossSalary,
            tax: tax,
            deductions: deductions,
            netSalary: netSalary,
        };
        if(editingEmployeeId === null){
            employees.push(employee);
        }
        else{
            const existingEmployee = employees.find(employee => employee.id === editingEmployeeId);
            existingEmployee.name = name;
            existingEmployee.ID = ID;
            existingEmployee.department = department;
            existingEmployee.designation = designation;
            existingEmployee.salary = salary;
            existingEmployee.experience = Number(experience);
            existingEmployee.rating = rating;
            existingEmployee.hra = hra;
            existingEmployee.da = da;
            existingEmployee.bonus = bonus;
            existingEmployee.grossSalary = grossSalary;
            existingEmployee.tax = tax;
            existingEmployee.deductions = deductions;
            existingEmployee.netSalary = netSalary;
            editingEmployeeId = null;
        }
        localStorage.setItem("employees",JSON.stringify(employees));
        form.reset();
        renderEmployeeList(employees);
    }
});

//Additional Calculations
function calculateHra(salary){
    return salary * 0.20;
}

function calculateDa(salary){
    return salary * 0.10;
}

function calculateBonus(salary,rating){
    if(rating >= 4.8){
        return salary * 0.20;
    }
    else if(rating >= 4){
        return salary * 0.15;
    }
    else if(rating >= 3){
        return salary * 0.10;
    }
    else if(rating >= 2){
        return salary * 0.05;
    }
    else if(rating >= 1){
        return salary * 0.02;
    }
    else{
        return 0;
    }
}

function calculateGrossSalary(salary,hra,da,bonus){
    return salary + hra + da + bonus;
}    

function calculateTax(grossSalary){
    return grossSalary * 0.1;
}

function calculateDeductions(salary){
    return salary * 0.02;
}

function calculateNetSalary(grossSalary,tax,deductions){
    return grossSalary - tax - deductions;
}

//Render the employee list
function renderEmployeeList(employees) {
    const employeeList = document.getElementById("employeesBody");
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.ID}</td>
            <td>${employee.department}</td>
            <td>${employee.designation}</td>
            <td>₹${employee.salary.toLocaleString('en-IN')}</td>
            <td>${employee.experience}</td>
            <td>${employee.rating}</td>
            <td>
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
                <button class="info-btn" data-id="${employee.id}">Info</button>
            </td>
        `;
        employeeList.appendChild(row);  
    });
}
renderEmployeeList(employees);

//Edit, Delete and Info buttons
employeeList.addEventListener("click", function(event){
    if(event.target.classList.contains("edit-btn")){
        const employeeId = parseInt(event.target.dataset.id);
        const employee = employees.find(
            employee => employee.id === employeeId
        );
        editingEmployeeId = employeeId;
        document.getElementById("name").value = employee.name;
        document.getElementById("ID").value = employee.ID;
        document.getElementById("department").value = employee.department;
        document.getElementById("designation").value = employee.designation;
        document.getElementById("salary").value = employee.salary;
        document.getElementById("experience").value = employee.experience;
        document.getElementById("rating").value = employee.rating;
    }
    if(event.target.classList.contains("delete-btn")){
        const employeeId = parseInt(event.target.dataset.id);
        const confirmDelete = confirm(
            "Are you sure you want to delete this employee?"
        );
        if(confirmDelete){
            const index = employees.findIndex(
                employee => employee.id === employeeId
            );
            employees.splice(index, 1);
            localStorage.setItem(
                "employees",
                JSON.stringify(employees)
            );
            renderEmployeeList(employees);
        }
    }
    if(event.target.classList.contains("info-btn")){
        const employeeId = parseInt(event.target.dataset.id);
        const employee = employees.find(
            employee => employee.id === employeeId
        );
        alert(`
            Employee Details

            Name: ${employee.name}
            ID: ${employee.ID}
            Department: ${employee.department}
            Designation: ${employee.designation}

            Basic Salary: ₹${employee.salary}
            HRA: ₹${employee.hra}
            DA: ₹${employee.da}
            Bonus: ₹${employee.bonus}

            Gross Salary: ₹${employee.grossSalary}

            Tax: ₹${employee.tax}
            Deductions: ₹${employee.deductions}

            Net Salary: ₹${employee.netSalary}
        `);
    }
});

//Filter employees
function applyFilters(){

    const searchValue = searchInput.value.toLowerCase().trim();
    const department = departmentFilter.value;
    const rating = ratingFilter.value;
    const sortBy = sortFilter.value;
    const filteredEmployees = employees.filter(employee => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchValue) ||
            employee.ID.toString().includes(searchValue) ||
            employee.department.toLowerCase().includes(searchValue) ||
            employee.designation.toLowerCase().includes(searchValue);
        const matchesDepartment =
            department === "" ||
            employee.department === department;
        const matchesRating =
            rating === "" ||
            employee.rating.toString() === rating;
        return matchesSearch &&
               matchesDepartment &&
               matchesRating;
    });
    if (sortBy === "salary") {
        filteredEmployees.sort((a, b) => {
            return b.salary - a.salary;
        });
    } else if (sortBy === "experience") {
        filteredEmployees.sort((a, b) => {
            return b.experience - a.experience;
        });
    }
    renderEmployeeList(filteredEmployees);
}

searchInput.addEventListener("input", applyFilters);
departmentFilter.addEventListener("change", applyFilters);
ratingFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);