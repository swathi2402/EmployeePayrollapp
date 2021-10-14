window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.getElementById("name");
    const textError = document.querySelector(".name-error");
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        new EmployeePayrollData().name = name.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    });
  
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
      output.textContent = salary.value;
    });
  
    var date = document.getElementById("day");
    var month = document.getElementById("month");
    var year = document.getElementById("year");
    const dateError = document.querySelector(".date-error");
    date.addEventListener('change', validateDate);
    month.addEventListener('change', validateDate);
    year.addEventListener('change', validateDate);
  
    function validateDate() {
      let startDate = Date.parse(
        year.value + "-" + month.value + "-" + date.value
      );
      try {
        new EmployeePayrollData().startDate = startDate;
        dateError.textContent = "";
      } catch (e) {
        dateError.textContent = e;
      }
    }
  });

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        console.log(employeePayrollData);
        createAndUpdateStorage(employeePayrollData);
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

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList =  [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setTextValue(".salary-output", "400000");
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}