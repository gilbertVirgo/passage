require("dotenv").config();

const { PORT } = process.env;

const express = require("express");
const app = express();

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
