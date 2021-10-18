let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getPayrollDataFromStorage();
    } else 
        getPayrollDataFromServer();
});

const getPayrollDataFromServer = () => {
    makePromisecall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponce();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponce();
        })
}

const processEmployeePayrollDataResponce = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getPayrollDataFromStorage = () => {
    employeePayrollList =  localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponce();
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const employeePayrollData of employeePayrollList) {
        innerHtml += `
            <tr>
                <td><img class="profile" alt="" src="${employeePayrollData._profilePic}"></td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${stringifyDate(employeePayrollData._startDate)}</td>
                <td>
                    <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                    <img id="${employeePayrollData.id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = employeePayrollList.find((empData) => empData.id == node.id);
    if (!empPayrollData) return;
    const index = employeePayrollList
                    .map((empData) => empData.id)
                    .indexOf(empPayrollData.id);
    employeePayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) { 
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
        document.querySelector(".emp-count").textContent = employeePayrollList.length;
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + empPayrollData.id.toString();
        makePromisecall("DELETE", deleteUrl, false)
        .then(responseText => {
            createInnerHtml();
        })
        .catch (error => {
            console.log("DELETE Error Status: " + JSON.stringify(error)); 
        });
    }
  };

  const update = (node) => {
    let empPayrollData = employeePayrollList.find((empData) => empData.id == node.id);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_employee_payroll_page);
  };