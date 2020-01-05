const fs = require("fs").promises;
const path = require("path");

const isWeekday = date => (date.getDay() > 0) && (date.getDay() < 6);

const dateIndex = () => {
	const date = new Date();
	return (
		(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
			Date.UTC(date.getFullYear(), 0, 0)) /
		24 /
		60 /
		60 /
		1000
	);
};

const accountForWeekends = async plan => {
	const today = new Date();

	let delta = 0,
		year = 365,
		dates = [];
	while (++delta <= year) {
		let date = new Date(today.getFullYear(), 0, delta);
		dates.push(date);
	}

	let weekendDays = 0;
	return dates.map((date, index) => {
		if (!isWeekday(date)) {
			weekendDays++;
			return null;
		} else {
			return plan[index - weekendDays];
		}
	});
};

const message = async () => {
	const file = await fs.readFile(path.join(__dirname, "plan.json"), "utf-8");
	const planData = JSON.parse(file);
    const plan = await accountForWeekends(planData);

	const index = dateIndex();

	if (plan[index]) {
		return plan[index];
	} else {
		// Weekend
		return null;
	}
};

module.exports = { message };
