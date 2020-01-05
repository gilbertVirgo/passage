require("dotenv").config();

const { PORT } = process.env;

const express = require("express");
const app = express();

const format = require("./format");
const com = require("./com");

com.tick(async () => {
    const body = await format.message();

    if(body) {
        await com.dispatch({ body });
    }
});

app.listen(PORT, () => console.log(`Service hosted on port ${PORT}`));

// TODO: Make dashboard for me