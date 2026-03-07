const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check (Render uchun)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'IA Bot',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 IA Bot server ishga tushdi: http://localhost:${PORT}`);
    console.log(`📅 Vaqt: ${new Date().toLocaleString('uz-UZ')}`);
});
