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