document.addEventListener("DOMContentLoaded", function () {
    const priorityCheckboxes = document.querySelectorAll(
      'input[name="priorities"]'
    );
  
    priorityCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const selectedValues = Array.from(priorityCheckboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
  
        filterTicketsByPriority(selectedValues);
      });
    });
  });
  
  function filterTicketsByPriority(selectedValues) {
    const issueContainers = document.querySelectorAll(".issue-container");
  
    issueContainers.forEach(function (issueContainer) {
      const issueList = issueContainer.querySelector(".issue-list");
      const issues = Array.from(issueList.getElementsByTagName("li"));
  
      issues.forEach(function (issue) {
        const priority = issue.querySelector("span.priority").textContent.toLowerCase();
  
        if (selectedValues.length === 0 || selectedValues.includes(priority)) {
          issue.style.display = "block";
        } else {
          issue.style.display = "none";
        }
      });
    });
  }