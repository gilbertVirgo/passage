const sms = require("./sms");
const fs = require("fs").promises;
const path = require("path");

const dispatch = async ({body}) => { 
    try {
        const profiles = JSON.parse(await fs.readFile(path.join(__dirname, "profiles.json")));

        for(const {phone} of profiles) {
            await sms.send({
                to: phone,
                body
            }); 
        }

        console.log(`Successfully sent messages to ${profiles.length} profiles.`)
    } catch(error) {
        console.error("There was an error sending the messages.");
        console.error(error);
    } 
}

const calculateDelay = () => {
    const today = new Date();
    // 6:00
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 6);

    return tomorrow - today;
}

const tick = (cb) => setTimeout(() => {
    cb();
    tick(cb);
}, calculateDelay());

module.exports = {tick, dispatch};