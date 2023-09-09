const { OpenAIApi } = require("openai");
const { Configuration } = require("openai");
const dotenv = require("dotenv");

dotenv.config();



/* OPEN AI CONFIGURATION */
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = { openai };
