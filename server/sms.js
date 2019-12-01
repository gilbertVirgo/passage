require("dotenv").config();

const {TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM} = process.env;

const client = require('twilio')(TWILIO_SID, TWILIO_TOKEN);

const test = () => {
	client.messages
		.create({
			body: 'Test',
			from: '+441282570053',
			to: '+447397543132'
		})
		.then(message => console.log(message.sid));
}

// await
const send = ({to, body}) => {
	const message = client.messages.create({
		to, body,
		from: TWILIO_FROM
	});

	return message;
}

module.exports = {test, send};