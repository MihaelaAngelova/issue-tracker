const addProjectForm = document.getElementById('add-project-popup-form');
const projectName = document.getElementById('project-name');
const projectSummary = document.getElementById('summary');
const projectDescription = document.getElementById('description');
const createdBy = document.getElementById('created-by');
const startDate = document.getElementById('start-date');
const targetEndDate = document.getElementById('target-end-date');
const actualEndDate = document.getElementById('actual-end-date');
const addEmployeesButton = document.getElementById('add-employee-button');
const employeesContainer = document.getElementById('employees-container');

function openAddProjectForm() {
    document.getElementById("add-project-popup").style.display = "block";
}


function closeForm() {
    document.getElementById("add-project-popup").style.display = "none";
}

addProjectForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const formData = new FormData(addProjectForm);

    const employees = Array.from(formData.getAll('employees[]'));

    const projectData = Object.fromEntries(formData);
    projectData.employees = employees;

    // Send a POST request to save the form data
    try{
      fetch('/homepage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
      })
      .then(response => response.json())
      .then(() => visualizeProject())
      .then(() => closeForm())
      .catch(error => {
          console.error('Error saving the form data:', error);
      });
    }
    catch(error) {
      console.error('Error saving the form data:', error);
    }
});

function visualizeProject() {
    const projectLi = document.createElement('li');
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('class', 'project-visualize');

    const projectInfoForm = document.createElement('form');
    projectInfoForm.setAttribute('id', 'project-info-form');
    projectInfoForm.setAttribute('action', '/project_dashboard/<%= project._id %>');
    projectInfoForm.setAttribute('method', 'post');

    const btnProjectInfo = document.createElement('button');
    btnProjectInfo.setAttribute('class', 'button');
    btnProjectInfo.setAttribute('id', 'project-info-button');
    btnProjectInfo.setAttribute('type', 'submit');
    btnProjectInfo.textContent = 'Project info';

    const divProjectInfoAPart1 = document.createElement('div');
    divProjectInfoAPart1.setAttribute('id', 'project-info-form-a-part');

    const divProjectInfoAPart2 = document.createElement('div');
    divProjectInfoAPart2.setAttribute('id', 'project-info-form-a-part');

    const projectTitle = document.createElement('span');
    projectTitle.textContent = "Project name: ";

    const strongProjectName = document.createElement('strong');
    strongProjectName.textContent = projectName.value;

    projectTitle.appendChild(strongProjectName);

    const projectTargetEndDate = document.createElement('span');
    projectTargetEndDate.textContent = "Target end-date: ";

    const strongTargetEndDate = document.createElement('strong');
    strongTargetEndDate.textContent = targetEndDate.value;

    projectTargetEndDate.appendChild(strongTargetEndDate);

    divProjectInfoAPart1.appendChild(projectTitle);
    divProjectInfoAPart1.append(document.createElement('br'));
    divProjectInfoAPart1.append(document.createElement('br'));
    divProjectInfoAPart1.append(projectTargetEndDate);
    divProjectInfoAPart1.append(document.createElement('br'));

    projectInfoForm.appendChild(divProjectInfoAPart1);

    divProjectInfoAPart2.appendChild(btnProjectInfo);

    projectInfoForm.appendChild(divProjectInfoAPart2);

    projectDiv.appendChild(projectInfoForm);
    projectLi.appendChild(projectDiv);

    closeForm();

    location.reload();

    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    let employeeCount = 1;
  
    addEmployeesButton.addEventListener("click", function() {
      employeeCount++;
  
      const newEmployeeField = document.createElement("div");

      newEmployeeField.className = "employee-field";
      newEmployeeField.innerHTML = `
        <input type="text" id="employees" name="employees[]" placeholder="Enter employee's username" required>
        <button type="button" class="remove-employee-button">-</button>`;
  
      employeesContainer.appendChild(newEmployeeField);
    });
  
    employeesContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("remove-employee-button")) {
        event.target.parentNode.remove();
      }
    });
  });