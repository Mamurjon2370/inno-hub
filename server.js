const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ---------------------------------------------------------
// RENDER UCHUN HEALTH CHECK (Juda muhim!)
// ---------------------------------------------------------
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'INNO HUB AI',
        timestamp: new Date().toISOString()
    });
});

// ---------------------------------------------------------
// 20+ API KALITLARINGIZNI SHU YERGA KIRITING
// ---------------------------------------------------------
const API_KEYS = [
    "AIzaSyYourAPIKey1.....................",
    "AIzaSyYourAPIKey2.....................",
    "AIzaSyYourAPIKey3....................."
    // Qolgan barcha kalitlarni shu tarzda qo'shing
];

let currentKeyIndex = 0;

async function getGeminiResponse(prompt, retryCount = 0) {
    if (retryCount >= API_KEYS.length) {
        throw new Error("Barcha API kalitlarining limiti tugadi. Iltimos, keyinroq urinib ko'ring.");
    }

    const apiKey = API_KEYS[currentKeyIndex];
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "Siz INNO HUB loyihasining aqlli AI yordamchisisiz. Sizning vazifangiz 4 ta asosiy yo'nalish: Robototexnika, Web dasturlash, Mobilografiya va 3D modellashtirish bo'yicha mutaxassis darajasida o'zbek tilida yordam berish. Xabarlarni xuddi insondek, tushunarli, kod namunalari va tushuntirishlar bilan taqdim eting."
    });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error(`⚠️ Kalit xatosi (Index: ${currentKeyIndex}): ${error.message}`);
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        console.log(`🔄 Yangi kalitga o'tildi. Hozirgi Index: ${currentKeyIndex}`);
        return getGeminiResponse(prompt, retryCount + 1);
    }
}

// Chat API
app.post('/api/chat', async (req, res) => {
    try {
        const { message, topic } = req.body;
        let contextPrompt = message;
        if (topic !== 'all') {
            contextPrompt = `Foydalanuvchi ${topic} yo'nalishi bo'yicha savol beryapti: ${message}`;
        }
        const answer = await getGeminiResponse(contextPrompt);
        res.json({ success: true, text: answer });
    } catch (error) {
        res.status(500).json({ success: false, text: "Kechirasiz, tizimda xatolik yuz berdi: " + error.message });
    }
});

// Boshqa barcha so'rovlar uchun Asosiy sahifa
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Render porti (render.yaml dagi port 10000 ga moslashtirildi)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 INNO HUB AI serveri ishga tushdi: http://localhost:${PORT}`);
});
