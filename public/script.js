function updateStatus(taskId, status) {
    fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskId, status: status })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      return response.json();
    })
    .then(data => {
      console.log("Status updated successfully:", data.message);
      // Optionally, update UI or show a success message
    })
    .catch(error => console.error("Error updating status:", error));
  }
  

  async function updateStatus(id, status) {
    try {
      const response = await fetch('/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status })
      });
  
      if (response.ok) {
        console.log("Status updated successfully");
        // Update the status text in the UI without reloading the page
        document.getElementById(`status-${id}`).innerText = status;
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  console.log("Script loaded");
  