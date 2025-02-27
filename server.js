const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
    const webhookURL = process.env.WEBHOOK_URL; // Discord webhook URL from Railway

    if (!webhookURL) {
        return res.status(500).json({ error: "Webhook URL not set!" });
    }

    try {
        await axios.post(webhookURL, req.body, {
            headers: { "Content-Type": "application/json" }
        });
        res.json({ success: "Webhook sent!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send webhook", details: error.message });
    }
});

app.listen(3000, () => console.log("🚀 Proxy running on port 3000"));
