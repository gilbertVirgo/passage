const sms = require("./sms");
const fs = require("fs").promises;
const path = require("path");

const dispatch = async ({body}) => { 
    const profiles = JSON.parse(await fs.readFile(path.join(__dirname, "profiles.json")));

    for(const {phone} of profiles) {
        await sms.send({
            to: phone,
            body
        }); 
    }
}

const tick = (cb) => {
    cb();

    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const msUntilTomorrow = tomorrow - today;

    setTimeout(() => tick, msUntilTomorrow);
}

module.exports = {tick, dispatch};