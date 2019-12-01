require("dotenv").config();

const { PORT } = process.env;

const express = require("express");
const app = express();

const today = new Date();
const tomorrowMorning = new Date(
	today.getFullYear(),
	today.getMonth(),
	today.getDate() + 1
);
const initialDelay = tomorrowMorning - today;

console.log(`dispatching message in ${initialDelay} ms`);

const format = require("./format");
const com = require("./com");

setTimeout(() => {
    com.tick(async () => {
        const body = await format.message();

        if(body !== false) {
            await com.dispatch({ body });
        }
    });
}, initialDelay);

app.listen(PORT, () => console.log(`Service hosted on port ${PORT}`));
