/**
 * IA Bot - Texnologiya Yordamchisi
 * Render.com uchun optimallashtirilgan versiya
 * @version 2.0.0
 * @author Mamurjon2370
 */

(function() {
    'use strict';

    // State
    let currentTopic = 'all';
    let chatMessages, userInput, sendBtn;
    let isTyping = false;

    // Knowledge Base - Kengaytirilgan ma'lumotlar bazasi
    const knowledgeBase = {
        greetings: {
            patterns: ['salom', 'assalom', 'hello', 'hi', 'hey', 'qalesan', 'qandaysan'],
            responses: [
                "👋 Salom! Men IA Botman. Sizga quyidagi yo'nalishlarda yordam beraman:\n\n🤖 Robototexnika\n💻 Web Dasturlash\n🎬 Mobilografiya\n🎨 3D Modellashtirish\n\nQaysi mavzu haqida gaplashmoqchisiz?"
            ]
        },
        thanks: {
            patterns: ['rahmat', 'thank', 'sagol', 'xayr', 'xayr'],
            responses: [
                "😊 Arzimaydi! Boshqa savolingiz bo'lsa, bemalol so'rang!",
                "👍 Sizga yordam bera olsam, xursandman!",
                "🌟 Har doim xizmatdamiz!"
            ]
        },
        robototexnika: {
            patterns: ['arduino', 'robot', 'sensor', 'motor', 'raspberry', 'iot', 'elektronika', 'led', 'servo', 'ultrasonic'],
            responses: [
                "🤖 **Robototexnika** bo'yicha:\n\nArduino dasturlash, sensorlar va dvigatellar haqida savol bering. Masalan:\n• Arduino bilan LED yondirish\n• HC-SR04 masofa sensori\n• Servo motor nazorati\n• Bluetooth orqali boshqarish",
                "🤖 **Arduino** uchun kod namunasi:\n```cpp\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n```\nBu kod 13-pin dagi LEDni yondirib-o'chiradi."
            ]
        },
        web: {
            patterns: ['html', 'css', 'javascript', 'react', 'web', 'frontend', 'backend', 'node', 'python', 'api', 'dom'],
            responses: [
                "💻 **Web Dasturlash** bo'yicha:\n\nFrontend yoki Backend haqida savol bering. Masalan:\n• HTML/CSS asoslari\n• JavaScript funksiyalar\n• React komponentlar\n• API bilan ishlash",
                "💻 **HTML** asosiy struktura:\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Sahifa</title>\n</head>\n<body>\n  <h1>Salom!</h1>\n</body>\n</html>\n```"
            ]
        },
        mobilografiya: {
            patterns: ['video', 'premiere', 'davinci', 'capcut', 'montaj', 'after effects', 'color grading', 'edit', 'timeline'],
            responses: [
                "🎬 **Mobilografiya** bo'yicha:\n\nVideo montaj va rang korreksiyasi haqida savol bering. Masalan:\n• Premiere Pro montaj\n• DaVinci Resolve color grading\n• CapCut mobil montaj\n• Green screen effektlar",
                "🎬 **Premiere Pro** tez klavishlar:\n• C - Razor (kesish)\n• V - Selection\n• Space - Play/Pause\n• Ctrl+K - Cut"
            ]
        },
        d3: {
            patterns: ['blender', '3d', 'unity', 'unreal', 'model', 'render', 'maya', '3ds max', 'animation', 'mesh'],
            responses: [
                "🎨 **3D Modellashtirish** bo'yicha:\n\nBlender yoki o'yin dvigatellari haqida savol bering. Masalan:\n• Blender box modeling\n• Unity dasturiy ta'minot\n• 3D animatsiya asoslari\n• Rendering sozlamalari",
                "🎨 **Blender** asosiy klavishlar:\n• G - Move (ko'chirish)\n• S - Scale (o'lcham)\n• R - Rotate (aylantirish)\n• Tab - Edit/Object mode"
            ]
        },
        default: {
            responses: [
                "❓ Iltimos, quyidagi 4 ta yo'nalishdan birini tanlang:\n\n1. 🤖 Robototexnika\n2. 💻 Web Dasturlash\n3. 🎬 Mobilografiya\n4. 🎨 3D Modellashtirish",
                "🤔 Savolingizni tushunmadim. Iltimos, yuqoridagi yo'nalishlardan birini tanlang yoki aniqroq yozing."
            ]
        }
    };

    // Topic ma'lumotlari
    const topicInfo = {
        robototexnika: { name: 'Robototexnika', icon: '🤖', color: '#3b82f6' },
        web: { name: 'Web Dasturlash', icon: '💻', color: '#10b981' },
        mobilografiya: { name: 'Mobilografiya', icon: '🎬', color: '#f59e0b' },
        d3: { name: '3D Modellashtirish', icon: '🎨', color: '#ec4899' },
        all: { name: 'Barchasi', icon: '🌟', color: '#6366f1' }
    };

    // Initialization
    function init() {
        // Elementlarni olish
        chatMessages = document.getElementById('chatMessages');
        userInput = document.getElementById('userInput');
        sendBtn = document.getElementById('sendBtn');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        // Tekshirish
        if (!chatMessages || !userInput || !sendBtn) {
            console.error('❌ Kerakli elementlar topilmadi!');
            return;
        }

        console.log('✅ IA Bot ishga tushmoqda...');

        // Event Listeners
        setupEventListeners();
        
        // Mobile menu
        setupMobileMenu(mobileMenuBtn, mobileMenu);

        // LocalStorage'dan yuklash
        loadChatHistory();

        // Welcome xabar
        console.log('🚀 Bot tayyor!');
    }

    function setupEventListeners() {
        // Send button
        sendBtn.addEventListener('click', handleSend);
        
        // Enter tugmasi
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });

        // Topic tugmalari
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const topic = this.dataset.topic;
                selectTopic(topic);
            });
        });

        // Feature kartalari
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                const topic = this.dataset.topic;
                selectTopic(topic);
                document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Global function for quick buttons
        window.selectTopic = function(topic) {
            setTopicInternal(topic);
        };

        // Clear chat global
        window.clearChat = clearChat;
    }

    function setupMobileMenu(btn, menu) {
        if (!btn || !menu) return;

        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Mobile menu linklarini yopish
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Tashqi click yopish
        document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    function handleSend() {
        if (isTyping) return;
        
        const text = userInput.value.trim();
        if (!text) return;

        // Foydalanuvchi xabarini qo'shish
        addUserMessage(text);
        userInput.value = '';
        userInput.focus();

        // Typing ko'rsatish
        showTyping();

        // Javob olish
        isTyping = true;
        const delay = 600 + Math.random() * 400;
        
        setTimeout(() => {
            hideTyping();
            const response = generateSmartResponse(text);
            addBotMessage(response);
            isTyping = false;
            saveChatHistory();
        }, delay);
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message user-message';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content"><p>${escapeHtml(text)}</p></div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'message bot-message';
        const formattedText = formatMessage(text);
        
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">${formattedText}</div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function formatMessage(text) {
        // Bold matn
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Yangi qator
        text = text.replace(/\n/g, '<br>');
        // Kod bloklari
        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>');
        return `<p>${text}</p>`;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'message bot-message typing';
        div.id = 'typingIndicator';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function hideTyping() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    function generateSmartResponse(msg) {
        const lower = msg.toLowerCase();
        
        // Salomlashish va boshqa patternlar
        for (let key in knowledgeBase) {
            if (key === 'default') continue;
            const item = knowledgeBase[key];
            if (item.patterns && item.patterns.some(p => lower.includes(p))) {
                const responses = item.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default javob
        const defaults = knowledgeBase.default.responses;
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function setTopicInternal(topic) {
        currentTopic = topic;
        
        // UI yangilash
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.topic === topic) {
                btn.classList.add('active');
            }
        });

        const info = topicInfo[topic];
        if (info) {
            addBotMessage(`🎯 **${info.name}** yo'nalishi tanlandi! ${info.icon}\n\nSavolingizni yozing, men yordam beraman.`);
        }
        
        saveChatHistory();
    }

    function selectTopic(topic) {
        setTopicInternal(topic);
    }

    function clearChat() {
        if (confirm('Barcha suhbatni o\'chirishni xohlaysizmi?')) {
            // Welcome xabarni saqlab qolish
            const welcome = chatMessages.querySelector('.welcome-message');
            chatMessages.innerHTML = '';
            if (welcome) {
                chatMessages.appendChild(welcome);
            } else {
                // Yangi welcome xabar
                addBotMessage(knowledgeBase.greetings.responses[0]);
            }
            localStorage.removeItem('iaBot_chatHistory');
            currentTopic = 'all';
            updateTopicUI('all');
        }
    }

    function updateTopicUI(topic) {
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.topic === topic) {
                btn.classList.add('active');
            }
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // LocalStorage funksiyalari
    function saveChatHistory() {
        try {
            const messages = chatMessages.innerHTML;
            localStorage.setItem('iaBot_chatHistory', messages);
            localStorage.setItem('iaBot_currentTopic', currentTopic);
            localStorage.setItem('iaBot_lastVisit', new Date().toISOString());
        } catch (e) {
            console.warn('Chat history saqlanmadi:', e);
        }
    }

    function loadChatHistory() {
        try {
            const saved = localStorage.getItem('iaBot_chatHistory');
            const savedTopic = localStorage.getItem('iaBot_currentTopic');
            const lastVisit = localStorage.getItem('iaBot_lastVisit');
            
            if (saved && saved.includes('message')) {
                chatMessages.innerHTML = saved;
                
                // Qaytgan foydalanuvchi uchun
                if (lastVisit) {
                    const lastDate = new Date(lastVisit);
                    const now = new Date();
                    const diffHours = (now - lastDate) / (1000 * 60 * 60);
                    
                    if (diffHours > 1) {
                        setTimeout(() => {
                            addBotMessage("👋 Qaytganingiz bilan! Qanday yordam bera olaman?");
                        }, 1000);
                    }
                }
            }
            
            if (savedTopic) {
                currentTopic = savedTopic;
                updateTopicUI(savedTopic);
            }
        } catch (e) {
            console.warn('Chat history yuklanmadi:', e);
        }
    }

    // Service Worker (PWA uchun)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('✅ Service Worker registered'))
                .catch(err => console.log('❌ Service Worker error:', err));
        });
    }

    // Ishga tushirish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
