import { students } from "./student.js";

//Elements to be used
const form = document.getElementById("student-form");
const studentList = document.getElementById("studentsBody");
const searchInput=document.getElementById("search")
const courseFilter = document.getElementById("courseFilter");
const genderFilter = document.getElementById("genderFilter");
const gradeFilter = document.getElementById("gradeFilter");
const sortFilter = document.getElementById("sortFilter");
const pagination = document.getElementById("pagination");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageNumbers = document.getElementById("pageNumbers");
const clearAll = document.getElementById("clearAll");
let currentPage = 1;
const studentsPerPage = 10;
let editingStudentId = null;

//Form Input
form.addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value.trim();
    const marks = document.getElementById("marks").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const course = document.getElementById("course").value;
    const city = document.getElementById("city").value;

    //Validation
    let isValid = true;

    //Name validation
    const err= document.getElementById("nameError");
    if(name ===""){
        err.textContent = "Name cannot be empty";
        isValid = false;
    } else if(name.length < 3){
        err.textContent = "Name must be at least 3 characters long";
        isValid = false; 
    } else if(name.length > 20){
        err.textContent = "Name cannot be longer than 20 characters";
        isValid = false;
    } 
    else if(!/^[a-zA-Z\s]+$/.test(name)){
        err.textContent = "Name can only contain letters and spaces";
        isValid = false;
    }
    else{
        err.textContent = "";
    }

    //Email validation
    const emailError = document.getElementById("emailError");
    if(email === ""){
        emailError.textContent = "Email cannot be empty";
        isValid = false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        emailError.textContent = "Invalid email format";
        isValid = false;
    }
    else{
        emailError.textContent = "";
    }

    //Age validation
    const ageError = document.getElementById("ageError");
    if(age === ""){
        ageError.textContent = "Age cannot be empty";
        isValid = false;
    } else if(isNaN(age) || age < 18 || age > 100){
        ageError.textContent = "Age must be a number between 18 and 100";
        isValid = false;
    }
    else{
        ageError.textContent = "";
    }

    
    //Gender validation
    const genderError = document.getElementById("genderError");
    if(!gender){
        genderError.textContent = "Please select a gender";
        isValid = false;
    }

    //Course validation
    const courseError = document.getElementById("courseError");
    if(course === ""){
        courseError.textContent = "Please select a course";
        isValid = false;
    }
    
    //Mark validation
    const marksError = document.getElementById("marksError");
    if (marks === ""){
        marksError.textContent = "Please enter a mark";
        isValid = false;
    }
    else if(isNaN(marks) || marks < 0 || marks > 100){
        marksError.textContent = "Mark must be a number between 0 and 100";
        isValid = false;
    }
    else{
        marksError.textContent = "";
    }

    //City validation
    const cityError = document.getElementById("cityError");
    if(city === ""){
        cityError.textContent = "Please select a city";
        isValid = false;
    }
    else if(!/^[a-zA-Z\s]+$/.test(city)){
        cityError.textContent = "City can only contain letters and spaces";
        isValid = false;
    }
    
    

    //If all validations pass, create a student object and add it to the students array
    if(isValid){
        //If new student create a student object and add it to the students array
        if (editingStudentId === null) {
        const student = {
            id: Date.now(),
            name: name,
            email: email,
            age: Number(age),
            gender: gender.value,
            course: course,
            marks: Number(marks),
            city: city,
            grade: calculateGrade(marks)
        };
        students.push(student);
    }
    
    else {
        //If existing student update the student object
        const student = students.find(s => s.id === editingStudentId);
        student.name = name;
        student.email = email;
        student.age = Number(age);
        student.gender = gender.value;
        student.course = course;
        student.marks = Number(marks);
        student.city = city;
        student.grade = calculateGrade(marks);
        editingStudentId = null; // Reset editing state
    }
        form.reset();
        localStorage.setItem("students", JSON.stringify(students));
        currentPage = 1;
        renderStudentList(students);
    }

})

function calculateInfo(students){
    let totalStudents=students.length
    if (totalStudents === 0) {
        document.getElementById("totalStudents").textContent = 0;
        document.getElementById("averageMarks").textContent = 0;
        document.getElementById("highestMarks").textContent = 0;
        document.getElementById("lowestMarks").textContent = 0;
        document.getElementById("passedStudents").textContent = 0;
        document.getElementById("failedStudents").textContent = 0;
        return;
    }
    let totalMarks=students.reduce((total,num)=>{return total+num.marks},0)
    let lowestMarks=students.reduce((min, current) => {
        return current.marks < min.marks ? current : min;
    }); 
    let highestMarks=students.reduce((max, current) => {
        return current.marks > max.marks ? current : max;
    }); 
    let avgMarks=(totalMarks/totalStudents).toFixed(2)
    let passedStudents = students.filter(student => student.marks >= 50).length;
    let failedStudents = students.filter(student => student.marks < 50).length;
    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("averageMarks").textContent = avgMarks;
    document.getElementById("highestMarks").textContent = highestMarks.marks;
    document.getElementById("lowestMarks").textContent = lowestMarks.marks;
    document.getElementById("passedStudents").textContent = passedStudents;
    document.getElementById("failedStudents").textContent = failedStudents;
}

//Calculate the grade of the student
function calculateGrade(marks) {
    if(marks >= 90){
        return "A+";
    }
    else if(marks >= 80){
        return "A";
    }
    else if(marks >= 70){
        return "B";
    }
    else if(marks >= 60){
        return "C";
    }
    else if(marks >= 50){
        return "D";
    }
    else{
        return "F";
    }
};

//Render the student list
function renderStudentList(students) {
    studentList.innerHTML = '';
    const totalPages = Math.ceil(students.length / studentsPerPage);
    if (students.length === 0) {
        studentList.innerHTML = `
            <tr>
                <td colspan="9">No students found.</td>
            </tr>
        `;
        calculateInfo([]);
        renderPagination([]);
        return;
    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const studentsToShow = students.slice(startIndex, endIndex);

    studentsToShow.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
            <td>${student.city}</td>
            <td>
                <button class="edit-btn" data-id="${student.id}">Edit</button>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
    calculateInfo(students);
    renderPagination(students);
}

//Render the pagination
function renderPagination(students) {
    const totalPages = Math.ceil(students.length / studentsPerPage);
    if (totalPages <= 1) {
        pagination.style.display = "none";
        pageNumbers.innerHTML = "";
        return;
    }
    pagination.style.display = "flex";
    pageNumbers.innerHTML = "";
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-number");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", function() {
            currentPage = i;
            renderStudentList(students);
        });
        pageNumbers.appendChild(button);
    }
}

//Navigate to the previous page
prevPage.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        renderStudentList(students);
    }
});

//Navigate to the next page
nextPage.addEventListener("click", function() {
    const totalPages = Math.ceil(students.length / studentsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderStudentList(students);
    }
});

//Clear all students
clearAll.addEventListener("click", function() {
    const confirmClear = confirm("Are you sure you want to delete all students?");
    if (confirmClear) {
        students.splice(0, students.length);
        localStorage.removeItem("students");
        currentPage = 1;
        renderStudentList(students);
    }
});


            
renderStudentList(students);

// Edit and Delete functions
studentList.addEventListener("click", function(event){
    if(event.target.classList.contains("edit-btn")){
        const studentId = parseInt(event.target.dataset.id);
        const student = students.find(s => s.id === studentId);
        editingStudentId = studentId;
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("age").value = student.age;
        document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        document.getElementById("course").value = student.course;
        document.getElementById("marks").value = student.marks;
        document.getElementById("city").value = student.city;
    }
    if (event.target.classList.contains("delete-btn")) {
    const studentId = parseInt(event.target.dataset.id);
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
        const index = students.findIndex(s => s.id === studentId);
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        currentPage = 1;
        renderStudentList(students);
    }
}

})

//Search students
searchInput.addEventListener("input",function(){
    const searchValue=searchInput.value.toLowerCase().trim()
    const filteredStudent=students.filter(student=>
        student.name.toLowerCase().includes(searchValue)||
        student.email.toLowerCase().includes(searchValue)||
        student.course.toLowerCase().includes(searchValue)
    );
    currentPage = 1;
    renderStudentList(filteredStudent)
})

//Filter students
function applyFilters() {
    const course = courseFilter.value;
    const gender = genderFilter.value;
    const grade = gradeFilter.value;

    const filteredStudents = students.filter(student => {
        return (
            (course === "" || student.course === course) &&
            (gender === "" || student.gender === gender) &&
            (grade === "" || student.grade === grade)
        );
    });
    currentPage = 1;
    renderStudentList(filteredStudents);
}

courseFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
gradeFilter.addEventListener("change", applyFilters);

//Sort students
sortFilter.addEventListener("change", function () {
    const sortValue = sortFilter.value;
    let sortedStudents = [...students];
    if (sortValue === "name") {
        sortedStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }
    else if (sortValue === "age") {
        sortedStudents.sort((a, b) =>
            Number(a.age) - Number(b.age)
        );
    }
    else if (sortValue === "marks") {
        sortedStudents.sort((a, b) =>
            Number(b.marks) - Number(a.marks)
        );
    }
    else if (sortValue === "grade") {
        const gradeOrder = {
            "A": 1,
            "B": 2,
            "C": 3,
            "D": 4,
            "F": 5
        };
        sortedStudents.sort((a, b) =>
            gradeOrder[a.grade] - gradeOrder[b.grade]
        );
    }
    currentPage = 1;
    renderStudentList(sortedStudents);
});