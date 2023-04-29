const meals = require('../data');

class Meal {
	constructor(data) {
		this.name = data.name;
		this.id = data.id;
		this.price = data.price;
		this.gluten = data.gluten;
		this.sauce = data.sauce;
		this.img = data.img;
	}

	static getAll() {
		return meals.map((mealData) => new Meal(mealData));
	}

	static async findByName(mealName) {
		try {
			const meal = meals.find((el) => el.name.toLowerCase() === mealName);
			console.log(meal);
			if (meal) {
				return meal;
			} else {
				console.log('Error');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	static create(data) {
		let idx;
		meals.length ? (idx = meals.reduce((m1, m2) => (m1.id > m2.id ? m1 : m2)).id + 1) : (idx = 1);
		if (!data.name || !data.price) {
			throw new Error('Name and price needs to be given');
		}
		const newMeal = new Meal({ id: idx, ...data });
		meals.push(newMeal);
		return newMeal;
	}

	static update(id, data) {
		const meal = meals.find((el) => el.id === id);
		try {
			const updatedMeal = { ...data, id: meal.id };
			const idIndex = meals.findIndex((el) => el.id === meal.id);
			console.log(idIndex);
			meals[idIndex] = updatedMeal;
			return updatedMeal;
		} catch (error) {
			throw new Error('Meal does not exist');
		}
	}

	static destroy(data) {
		const meal = meals.find((el) => el.id === data);
		console.log(meal);
		if (meal) {
			const mealIdx = meals.indexOf(meal);
			console.log(mealIdx);
			meals.splice(mealIdx, 1);
		} else {
			throw new Error('Meal not found');
		}
	}
}

module.exports = Meal;
