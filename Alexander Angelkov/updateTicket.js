const ticketSubmitButton = document.getElementById('ticketSubmitButton');
const ticketName = document.getElementById('ticketName');
const ticketSummary = document.getElementById('ticketSummary');
const ticketDescription = document.getElementById('ticketDescription');
const ticketProgress = document.getElementById('ticketProgress');
const ticketUpdateButton = document.getElementById('ticketUpdateButton');
const cancelButton = document.getElementById('cancelButton');


ticketUpdateButton.addEventListener('click', function() {

  ticketSubmitButton.disabled = !ticketSubmitButton.disabled;
  ticketName.readOnly = !ticketName.readOnly;
  ticketSummary.readOnly = !ticketSummary.readOnly;
  ticketDescription.readOnly = !ticketDescription.readOnly;
  ticketProgress.readOnly = !ticketProgress.readOnly;
  if(ticketName.readOnly){
    ticketUpdateButton.innerText="Update Ticket";
  }else{
    ticketUpdateButton.innerText="Cancel";
  }
});

