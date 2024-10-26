// Add any specific JavaScript code here if needed in the future
console.log("task added");

document.addEventListener('DOMContentLoaded', () => {
    const currentDay = new Date().toLocaleString('en-us', { weekday: 'long' }); // Get today's day (e.g., "Monday")
    const tasks = document.querySelectorAll('.task');
  
    tasks.forEach(task => {
      const dayText = task.querySelector('p:nth-child(2)').innerText; // "Day: Monday" text
      const day = dayText.split(': ')[1]; // Extract day from "Day: Monday"
  
      if (day === currentDay) {
        task.classList.add('active-day'); // Apply .active-day if it matches current day
      }
    });
  });
