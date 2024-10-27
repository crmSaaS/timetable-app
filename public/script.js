function updateStatus(taskId, status) {
    // This is the async implementation of updating the status
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
                document.getElementById(`status-${id}
