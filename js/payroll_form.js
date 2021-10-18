let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.getElementById("name");
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        setTextValue('.name-error', "");
        return;
      }
      try {
        checkName(name.value);
        setTextValue('.name-error', "");
      } catch (e) {
        setTextValue('.name-error', e);
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
        checkStartDate(startDate);
        dateError.textContent = "";
      } catch (e) {
        dateError.textContent = e;
      }
    }

    checkForUpdate();
  });

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
        if(!nameRegex.test(name)) 
            throw 'Name is incorrect';
}

const checkStartDate = (startDate) => {
    let now = new Date();
        if (startDate > now) 
            throw 'Start date is future date';
        let oneMonthSpan = new Date();
        oneMonthSpan.setDate(oneMonthSpan.getDate() - 30);
        if (startDate < oneMonthSpan)
            throw 'Start date is beyond 30 days';
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        if(site_properties.use_local_storage.match("true")) { 
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateEmployeePayroll();
        }
    } catch (error) {
        return;
    }
}

const createOrUpdateEmployeePayroll = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postUrl = postUrl + employeePayrollObj.id.toString();
    }
    makePromisecall(methodCall, postUrl, true, employeePayrollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch (error => {
            throw error();
        });
}

const setEmployeePayrollObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")) { 
        employeePayrollObj.id = createNewEmployeeId();
    }
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
        let employeePayrollData = employeePayrollList.find((empData) => empData.id == employeePayrollObj.id);
        if(!employeePayrollData) {
            employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList
                            .map((empData) => empData.id)
                            .indexOf(employeePayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    } else {
        employeePayrollList =  [employeePayrollObj]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
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
  