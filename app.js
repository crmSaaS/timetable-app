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

app.get('/', (req, res) => {
  res.render('index', { timetable });
});

app.post('/add', (req, res) => {
  const { subject, day, time } = req.body;
  const newTask = {
    id: timetable.length + 1,
    subject,
    day,
    time,
    status: "scheduled"
  };
  timetable.push(newTask);
  res.redirect('/');
});

app.post('/update', (req, res) => {
  const { id, status } = req.body;
  const task = timetable.find(task => task.id == id);
  if (task) task.status = status;
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
