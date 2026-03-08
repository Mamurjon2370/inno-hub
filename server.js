const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// JSON va static fayllar uchun
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ---------------------------------------------------------
// 20+ API KALITLARINGIZNI SHU YERGA KIRITING
// ---------------------------------------------------------
const API_KEYS = [
    "AIzaSyYourAPIKey1.....................",
    "AIzaSyYourAPIKey2.....................",
    "AIzaSyYourAPIKey3....................."
    // Qolgan barcha kalitlarni shu tarzda qo'shing
];

let currentKeyIndex = 0; // Boshlang'ich kalit indeksi

// Gemini API'dan javob olish va kalitlarni aylantirish logikasi
async function getGeminiResponse(prompt, retryCount = 0) {
    // Agar barcha kalitlar tekshirilib chiqilgan bo'lsa
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
        
        // Xato bersa (limit tugasa yoki ban bo'lsa) keyingi kalitga o'tamiz
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        console.log(`🔄 Yangi kalitga o'tildi. Hozirgi Index: ${currentKeyIndex}`);
        
        // Qaytadan urinib ko'rish
        return getGeminiResponse(prompt, retryCount + 1);
    }
}

// API endpoint
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

// Asosiy sahifa
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 INNO HUB AI serveri ishga tushdi: http://localhost:${PORT}`);
});
