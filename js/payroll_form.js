const salary = document.querySelector('#salary');
const salary_output = document.querySelector('.salary-output');
salary_output.textContent = salary.value;
salary.addEventListener('input',function() {
    salary_output.textContent = salary.value;
});

var form = document.querySelector("form");
form.onsubmit = function() { 
    employeeName = document.getElementById("name").value;
    employeeGender =  document.getElementsByName("gender").value;
    employeeDepartment =  document.getElementsByName("department").value;
    employeeSalary = document.getElementById("salary").value;
    day = document.getElementById("day").value;
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;
    employeeStartDate = new Date(month + " " + day + " " + year);

    try {
        let employeePayrollData = new EmployeePayrollData(employeeName, employeeGender, employeeDepartment, employeeSalary, employeeStartDate);
        alert ("Employee Object populated: " + employeePayrollData);
    } catch (e) {
        alert (e);
    }
}

// function save() { 
//     employeeName = document.querySelector('#name').value;
//     employeeGender =  document.querySelector('#gender').value;
//     employeeDepartment =  document.querySelector('#department').value;
//     employeeSalary = document.querySelector('#salary').value;
//     day = document.querySelector('#day').value;
//     month = parseInt(document.querySelector('#month').value) - 1;
//     year = document.querySelector('#year').value;
//     employeeStartDate = new Date(year, month, day);

//     try {
//         let employeePayrollData = new EmployeePayrollData(employeeName, employeeGender, employeeDepartment, employeeSalary, employeeStartDate);
//         alert ("Employee Object populated: " + employeePayrollData);
//     } catch (e) {
//         alert (e);
//     }
// }