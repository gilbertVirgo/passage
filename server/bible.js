require("dotenv").config();

const { BIBLE_API_KEY } = process.env;

const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

export const getPassage = async ref => {
	ref = ref.replace(/ /g, "+");

	const params = new URLSearchParams();

	params.append("q", verse);
	params.append("include-passage-references", "false");
	params.append("include-verse-numbers", "false");
	params.append("include-first-verse-numbers", "false");
	params.append("include-footnotes", "false");
	params.append("include-footnote-body", "false");
	params.append("include-headings", "false");
	params.append("include-short-copyright", "false");

	try {
		const req = await fetch(
			`https://api.esv.org/v3/passage/text/?${params.toString()}`,
			{
				headers: {
					Authorization: `Token ${BIBLE_API_KEY}`
				}
			}
		);
		const { passages, query } = await req.json();

		return { passages, query };
	} catch (error) {
		console.error(error);

		return { error };
	}
};
