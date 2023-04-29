const Meal = require('../models/Meal.js');

async function index(req, res) {
	try {
		const meals = await Meal.getAll();
		res.status(200).json(meals);
	} catch (err) {
		res.status(500).send({ error: 'Server error' });
	}
}

const show = async (req, res) => {
	try {
		const mealName = req.params.name;
		const meal = await Meal.findByName(mealName);
		res.status(200).json(meal);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

async function create(req, res) {
	try {
		const newMeal = await Meal.create(req.body);
		res.status(201).send(newMeal);
	} catch (err) {
		// res.status(404).send({ error: 'Meal with given ID does not exist' });
		res.status(422).json({ err });
	}
}

async function update(req, res) {
	try {
		const id = parseInt(req.params.id);
		const updatedMeal = await Meal.update(id, req.body);
		res.status(201).send(updatedMeal);
	} catch (err) {
		res.status(204).send({ error: err });
	}
}

function destroy(req, res) {
	const idx = parseInt(req.params.id);
	console.log(idx);
	try {
		const meals = Meal.destroy(idx);
		res.send(meals);
	} catch (err) {
		res.status(404).send({ error: err });
	}
}

module.exports = { index, show, create, update, destroy };
