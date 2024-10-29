const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let timetable = [];

// Read data from JSON file
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      // File does not exist, initialize with empty array
      timetable = [];
      fs.writeFile("data.json", JSON.stringify(timetable, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error creating file:", writeErr);
        }
      });
    } else {
      console.error("Error reading file:", err);
      return; // Exit if there's an error other than file not existing
    }
  } else {
    try {
      // If the file is empty, set timetable to an empty array
      timetable = data.trim() ? JSON.parse(data) : [];
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  }
});

const validDays = new Set([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]);

app.get('/', (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal server error");
    }

    try {
      const timetable = data.trim() ? JSON.parse(data) : []; // Parse or set to empty array
      res.render('index', { timetable }); // Render the page with updated timetable
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Internal server error");
    }
  });
});


app.post('/add', (req, res) => {
  const { subject, day, time } = req.body;



  if (!validDays.has(day)) {
    return res.status(400).send("Invalid day input");
  }

  const duplicate = timetable.some(task => task.day === day && task.subject === subject);

  if (duplicate) {
    return res.send("Duplicate data: The same subject is scheduled on the same day.");
  }

  const newTask = {
    id: Date.now(),
    subject,
    day,
    time,
    status: "scheduled"
  };



  if (
    newTask.day === "monday" || newTask.day === "tuesday" || newTask.day === "wednesday" || newTask.day === "thursday" || newTask.day === "friday" || newTask.day === "saturday" || newTask.day === "sunday" || newTask.day === "Monday" || newTask.day === "Tuesday" || newTask.day === "Wednesday" || newTask.day === "Thursday" || newTask.day === "Friday" || newTask.day === "Saturday" || newTask.day === "Sunday"
  ) {


    timetable.push(newTask);

    // Write updated timetable to JSON file
    fs.writeFile("data.json", JSON.stringify(timetable, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }
    });

    res.redirect('/');
  }
});
app.post('/delete', (req, res) => {
  const dId = Number(req.body.id); // Convert the ID to a number

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal server error");
    }

    try {
      let timetable = JSON.parse(data); // Parse the JSON data

      if (Array.isArray(timetable)) {
        // Filter out the task with the matching ID
        const updatedTimetable = timetable.filter(task => task.id !== dId);

        // Write the updated timetable back to the JSON file
        fs.writeFile("data.json", JSON.stringify(updatedTimetable, null, 2), (writeErr) => {
          if (writeErr) {
            console.error("Error writing file:", writeErr);
            return res.status(500).send("Internal server error");
          }
          res.redirect('/'); // Redirect to the main page after successful deletion
        });
      } else {
        console.error("Data is not an array:", data);
        return res.status(500).send("Internal server error");
      }
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Internal server error");
    }
  });
});
app.post('/update', (req, res) => {
  const { id, status } = req.body;
  const task = timetable.find(task => task.id == id);

  if (task) {
    task.status = status;

    // Write updated timetable to JSON file
    fs.writeFile("data.json", JSON.stringify(timetable, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }
    });
  }


  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));