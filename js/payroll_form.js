const text = document.querySelector('#name');
const textError = document.querySelector('.name-error');
text.addEventListener('input', function() {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(text.value))
        textError.textContent = "";
    else
        textError.textContent ="Name is incorrect";
});

const salary = document.querySelector('#salary');
const salary_output = document.querySelector('.salary-output');
salary_output.textContent = salary.value;
salary.addEventListener('input',function() {
    salary_output.textContent = salary.value;
});

const save = () => {
    try {
        createEmployeePayroll();
    } catch (error) {
        return;
    }
}

const createEmployeePayroll = () => { 
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    } catch (error) {
        setTextValue('.name-error', error);
        throw error;
    }
    try {
        employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
        employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
        employeePayrollData.department = getSelectedValues('[name=department]');
        employeePayrollData.salary = getInputValueById("#salary");
        employeePayrollData.note = getInputValueById("#notes");
        let date = getInputValueById("#month") + " " + getInputValueById('#day') + " " + getInputValueById('#year');
        employeePayrollData.startDate = new Date(date);      
        alert(employeePayrollData.toString());
        return employeePayrollData;
    } catch (error) {
        alert(error);
    }
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}