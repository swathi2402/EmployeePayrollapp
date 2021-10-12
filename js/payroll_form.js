const salary = document.querySelector('#salary');
const salary_output = document.querySelector('.salary-output');
salary_output.textContent = salary.value;
salary.addEventListener('input',function() {
    salary_output.textContent = salary.value;
});

var form = document.querySelector("form");
form.onsubmit = function() { 
    employeeName = document.getElementById("name").value;
    employeeGender =  document.querySelector('input[name="gender"]:checked').value;
    employeeDepartment =  document.querySelector('input[name="department"]:checked').value;
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

