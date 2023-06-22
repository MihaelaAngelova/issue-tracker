const projectSubmitButton = document.getElementById('projectSubmitButton');
const projectName = document.getElementById('projectName');
const projectUpdateButton = document.getElementById('projectUpdateButton');
const cancelButton = document.getElementById('cancelButton');


projectUpdateButton.addEventListener('click', function() {

  projectSubmitButton.disabled = !projectSubmitButton.disabled;
  projectName.readOnly = !projectName.readOnly;
  if(projectName.readOnly){
    projectUpdateButton.innerText="Update Project";
  }else{
    projectUpdateButton.innerText="Cancel";
  }
});