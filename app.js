const express = require('express');
const cors = require('cors');
const path = require('path');
const meals = require('./meals.json');
const { capitalise } = require('./helpers');

const app = express();
const index = path.join(__dirname, './index.html');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// -----

app.get('/', (req, res) => {
	res.sendFile(index);
});

app.get('/meals', (req, res) => {
	res.send(fruits);
});

module.exports = app;

// const url = 'https://raw.githubusercontent.com/Tellur89/food_json/main/food.json';
