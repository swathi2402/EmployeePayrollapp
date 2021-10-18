let isUpdate = false;
let employeePayrollObj = {};

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

    checkForUpdate();
  });

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (error) {
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById("#salary");
    employeePayrollObj._note = getInputValueById("#notes");
    let date = getInputValueById("#month") + " " + getInputValueById('#day') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;   
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
        employeePayrollData.id = new Date().getTime();   
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

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList) {
        let employeePayrollData = employeePayrollList.find((empData) => empData._id == employeePayrollObj._id);
        if(!employeePayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
                            .map((empData) => empData._id)
                            .indexOf(employeePayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollData._id));
        }
    } else {
        employeePayrollList =  [createEmployeePayroll()]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id)
        employeePayrollData.id = createNewEmployeeId();
    else
        employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (error) {
        setTextValue('.name-error', error);
        throw error;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (error) {
        setTextValue('.date-error', error);
        throw error;
    }
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeId", empId);
    return empId;
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

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
  };
  
  const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
  };
  
  const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
      if (Array.isArray(value)) {
        if (value.includes(item.value)) {
          item.checked = true;
        }
      } else if (item.value == value) 
        item.checked = true;
    });
  };
  