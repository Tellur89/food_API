const express = require('express');
const cors = require('cors');
const path = require('path');
const { writeFile, readFile } = require('node:fs');
const bodyParser = require('body-parser');
const meals = require('./meals.json');
const { capitalise } = require('./helpers');
// const NewMeal = require('./src/JS/newMeal');

class NewMeal {
	constructor(name, id, price, sauce, img, gluten) {
		this.name = name;
		this.id = id;
		this.price = price;
		this.sauce = sauce;
		this.img = img;
		this.gluten = gluten;
	}
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));
// const index = path.join(__dirname, './index.html');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// -----

// GET
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/meals', (req, res) => {
	res.send(meals);
});

app.get('/meals/:name', (req, res) => {
	const name = req.params.name.toLowerCase();
	const meal = meals.find((el) => el.name.toLowerCase() === name);

	meal === undefined ? res.status(404).json({ error: `meal: ${name} not found` }) : res.send(meal);
});
// -----

// POST
app.post('/meals', (req, res) => {
	const ids = meals.map((el) => el.id);
	let maxId = Math.max(...ids);

	const meal = meals.find((el) => el.name === req.body.name);

	if (meal !== undefined) {
		res.status(409).send({ error: 'Meal already exist' });
	} else {
		maxId += 1;
		const newMeal = req.body;
		newMeal.id = maxId.toString();
		meals.push(newMeal);
		res.status(201).send(newMeal);
	}
});

app.post('/add', (req, res) => {
	const ids = meals.map((el) => Number(el.id));
	let maxId = Math.max(...ids);
	const newMealId = (maxId += 1).toString();
	const newMeal = new NewMeal(req.body.mealName, newMealId, req.body.mealPrice, req.body.mealSauce, req.body.mealImg, req.body.mealGluten);

	readFile('./meals.json', (err) => {
		if (err) {
			console.error(err);
		}

		if (req.method == 'POST') {
			meals.push(newMeal);
		}

		writeFile('./meals.json', JSON.stringify(meals), () => {
			if (err) {
				console.error(err);

				res.end();
			}
		});
	});
	res.status(201).send(newMeal);
});
// -----

// PATCH
app.patch('/meals/:id', (req, res) => {
	const id = req.params.id;
	const meal = meals.find((el) => el.id === req.params.id);

	if (meal === undefined) {
		return res.status(404).send({ error: 'Meal does not exist' });
	}

	try {
		const updatedMeal = { ...req.body, id: meal.id };
		const idIndex = meals.findIndex((el) => el.id === meal.id);
		meals[idIndex] = updatedMeal;
		res.send(updatedMeal);
	} catch (err) {
		res.status(400).send('Could not update it.');
	}
});
// -----

// DELETE
app.delete('/meals/:id', (req, res) => {
	const meal = req.params.id;

	const mealIndex = meals.findIndex((el) => el.id === meal);

	if (mealIndex === -1) {
		res.status(404).send({ error: 'Meal does not exist' });
	} else {
		meals.splice(mealIndex, 1);

		res.status(204).send();
	}
});

module.exports = app;
