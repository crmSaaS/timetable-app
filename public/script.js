// Add any specific JavaScript code here if needed in the future
console.log("task added");

// Set the button text using innerHTML
document.getElementById('ritesh').innerHTML = "Add to Timetable";

// Optional: Add an event listener for form submission
document.getElementById('add-form').addEventListener('submit', function(event) {
    alert('Task added successfully!');
    // Optionally prevent the default form submission for testing
    // event.preventDefault();
});

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function(event) {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) {
            event.preventDefault(); // Prevent form submission if not confirmed
        }
    });
});
