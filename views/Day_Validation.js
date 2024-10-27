function validateDay(day) {
    // List of valid day options
    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // Check if the entered day is in the list of valid days
    if (validDays.includes(day)) {
        return true; // Valid day
    } else {
        alert("Please enter a valid day of the week.");
        return false; // Invalid day
    }
}
//examplee
const dayInput = document.getElementById("dayInput"); // Assuming an input field with id="dayInput"

dayInput.addEventListener("change", function() {
    const day = dayInput.value.trim();
    validateDay(day);
});
