const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let timetable = [
  { id: 1, subject: "Math", day: "Monday", time: "10:00 AM", status: "scheduled" },
  { id: 2, subject: "English", day: "Tuesday", time: "11:00 AM", status: "scheduled" }
];

const validDays = new Set([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]);

app.get('/', (req, res) => {
  res.render('index', { timetable });
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
    id : Date.now(),
    id: timetable.length + 1,
    subject,
    day,
    time,
    status: "scheduled"

  };



  if (
    newTask.day === "monday" || newTask.day ==="tuesday" || newTask.day ==="wednesday"||newTask.day === "thursday" || newTask.day ==="friday" || newTask.day ==="saturday"||newTask.day ==="sunday" || newTask.day === "Monday" || newTask.day ==="Tuesday" || newTask.day ==="Wednesday"||newTask.day === "Thursday" || newTask.day ==="Friday" || newTask.day ==="Saturday"||newTask.day ==="Sunday"  
  ){
      

  timetable.push(newTask);


  }
  else{
    res.status(400).send("Invalid day input");
  }
  res.redirect('/');
});

app.post('/update', (req, res) => {
  const { id, status } = req.body;
  const task = timetable.find(task => task.id == id);
  
  if (task) {
    task.status = status;
  }
  
  res.redirect('/');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
