const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); // This line enables JSON parsing for the app
app.set('view engine', 'ejs');

let timetable = [
  { id: 1, subject: "Math", day: "Monday", time: "10:00 AM", status: "scheduled" },
  { id: 2, subject: "English", day: "Tuesday", time: "11:00 AM", status: "scheduled" }
];

const validDays = new Set([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "M
