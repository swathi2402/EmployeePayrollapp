class EmployeePayrollData {
    gender;
    department;

    constructor(...params) {
        this.name = params[0];
        this.gender = params[1];
        this.department = params[2];
        this.salary = params[3];
        this.startDate = params[4];
    }

    get name() {
        return this._name; 
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
        if(nameRegex.test(name)) this._name = name;
        else throw 'Name is incorrect';
    }


    get salary() {
        return this._salary; 
    }

    set salary(salary) {
        let salaryRegex = RegExp('^[0-9.]+$')
        if(salaryRegex.test(salary)) this._salary = salary;
        else throw 'Salary is incorrect';
    }

    get gender() {
        return this._gender; 
    }

    set gender(gender) {
        this._gender = gender;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        if(new Date() < startDate) throw 'Start date is invalid!';
        else this._startDate = startDate;
    }

    toString() {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = !this.startDate ? "not defined" : 
                        this.startDate.toLocaleDateString("en-US", options);
        return "name = " + this.name + ", salary = " + this.salary + ", startDate = " + empDate;
    }
} 

list= [];

var form = document.querySelector("form");
form.onsubmit = function() { 
    employeeName = document.getElementById("name").value;
    employeeGender =  document.getElementsByName("gender").value;
    employeeDepartment =  document.getElementsByName("department").value;
    employeeSalary = document.getElementById("salary").value;
    day = document.getElementById("day").value;
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;
    employeeStartDate = new Date(year, month, day);

    let employeePayrollData = new EmployeePayrollData(employeeName, employeeGender, employeeDepartment, employeeSalary, employeeStartDate);
    list.push(employeePayrollData);
    console.log(list);
}

