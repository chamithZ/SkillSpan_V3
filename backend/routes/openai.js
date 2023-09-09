const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { openai } = require("./config_openai");

const router = express.Router();

dotenv.config();

// Error handling middleware
const handleOpenAIError = (error, res) => {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
};

router.post("/text", async (req, res) => {
    try {
        const { text, activeChatId } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const botResponse = response.data.choices[0].text;

        // Send the bot response to your chat engine
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: botResponse },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        );

        res.status(200).json({ text: botResponse });
    } catch (error) {
        handleOpenAIError(error, res);
    }
});

router.post("/code", async (req, res) => {
    try {
        const { text, activeChatId } = req.body;

        const response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const botResponse = response.data.choices[0].text;

        // Send the bot response to your chat engine
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: botResponse },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        );

        res.status(200).json({ text: botResponse });
    } catch (error) {
        handleOpenAIError(error, res);
    }
});

router.post("/assist", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Finish my thought: ${text}`,
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const botResponse = response.data.choices[0].text;

        res.status(200).json({ text: botResponse });
    } catch (error) {
        handleOpenAIError(error, res);
    }
});

module.exports = router;
