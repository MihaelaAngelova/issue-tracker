const assigneeSelect = document.querySelector("#assignee-username");
const assigneeFilterForm = document.querySelector("#assignee-username-filter");


assigneeFilterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    applyFilters();
});

function applyFilters() {
  const selectedAssignee = assigneeSelect.value;

  filterByAssigneeAndPriorityAndStatus(selectedAssignee); 
}

function filterByAssigneeAndPriorityAndStatus(selectedAssignee) {
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const assigneeCell = row.querySelector("td:nth-child(7)");
    const assignees = assigneeCell.textContent.split(",");

    const assigneeMatches = selectedAssignee === "" || assignees.includes(selectedAssignee);

    if (assigneeMatches) { 
      row.style.display = ""; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  });
}