// IA Bot - Texnologiya Yordamchisi
class IABot {
    constructor() {
        this.currentTopic = 'all';
        this.init();
    }

    init() {
        // Barcha elementlar yuklangandan keyin
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Elementlarni olish
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');

        // Eventlarni sozlash
        this.setupEvents();
        this.setupTopicButtons();
        this.setupFeatureCards();
        
        console.log('Bot tayyor!');
    }

    setupEvents() {
        // Jo'natish tugmasi
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMessage();
            });
        }

        // Enter tugmasi
        if (this.userInput) {
            this.userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleMessage();
                }
            });
        }
    }

    setupTopicButtons() {
        const buttons = document.querySelectorAll('.topic-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTopic = btn.dataset.topic;
                
                const topicName = this.getTopicName(this.currentTopic);
                this.addBotMessage(`✅ Endi faqat **${topicName}** bo'yicha javob beraman. Savolingizni yozing!`);
            });
        });
    }

    setupFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const topic = card.dataset.topic;
                this.setTopic(topic);
                document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    setTopic(topic) {
        this.currentTopic = topic;
        
        // Tugmalarni yangilash
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.topic === topic) {
                btn.classList.add('active');
            }
        });

        const topicName = this.getTopicName(topic);
        this.addBotMessage(`🎯 **${topicName}** yo'nalishi tanlandi! Bu mavzu haqida istalgan savolingizni bering.`);
    }

    getTopicName(topic) {
        const names = {
            robototexnika: 'Robototexnika',
            web: 'Web Dasturlash',
            mobilografiya: 'Mobilografiya',
            d3: '3D Modellashtirish',
            all: 'Barchasi'
        };
        return names[topic] || topic;
    }

    handleMessage() {
        if (!this.userInput) return;
        
        const text = this.userInput.value.trim();
        if (!text) return;

        // Foydalanuvchi xabarini qo'shish
        this.addUserMessage(text);
        this.userInput.value = '';

        // Javob tayyorlash
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(text);
            this.addBotMessage(response);
        }, 800);
    }

    addUserMessage(text) {
        if (!this.chatMessages) return;
        
        const div = document.createElement('div');
        div.className = 'message user-message';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content"><p>${this.escapeHtml(text)}</p></div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }

    addBotMessage(text) {
        if (!this.chatMessages) return;
        
        const div = document.createElement('div');
        div.className = 'message bot-message';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">${this.formatText(text)}</div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }

    showTyping() {
        if (!this.chatMessages) return;
        
        const div = document.createElement('div');
        div.className = 'message bot-message typing';
        div.id = 'typingIndicator';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }

    hideTyping() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    generateResponse(msg) {
        const lower = msg.toLowerCase();
        
        // Salomlashish
        if (/salom|assalom|hello|hi/.test(lower)) {
            return "👋 Salom! Men IA Botman. Sizga quyidagi yo'nalishlarda yordam beraman:\n\n🤖 Robototexnika\n💻 Web Dasturlash\n🎬 Mobilografiya\n🎨 3D Modellashtirish\n\nQaysi mavzu haqida gaplashmoqchisiz?";
        }
        
        // Rahmat
        if (/rahmat|thank/.test(lower)) {
            return "😊 Arzimaydi! Boshqa savolingiz bo'lsa, bemalol so'rang!";
        }

        // 4 ta yo'nalish haqida javob
        if (this.currentTopic === 'robototexnika' || /arduino|robot|sensor|motor/.test(lower)) {
            return "🤖 **Robototexnika** bo'yicha:\n\nArduino dasturlash, sensorlar va dvigatellar haqida savol bering. Masalan:\n- Arduino bilan LED yondirish\n- HC-SR04 masofa sensori\n- Servo motor nazorati";
        }
        
        if (this.currentTopic === 'web' || /html|css|javascript|react|web/.test(lower)) {
            return "💻 **Web Dasturlash** bo'yicha:\n\nFrontend yoki Backend haqida savol bering. Masalan:\n- HTML/CSS asoslari\n- JavaScript funksiyalar\n- React komponentlar";
        }
        
        if (this.currentTopic === 'mobilografiya' || /video|premiere|davinci|capcut|montaj/.test(lower)) {
            return "🎬 **Mobilografiya** bo'yicha:\n\nVideo montaj va rang korreksiyasi haqida savol bering. Masalan:\n- Premiere Pro montaj\n- DaVinci Resolve color grading\n- CapCut mobil montaj";
        }
        
        if (this.currentTopic === 'd3' || /blender|3d|unity|unreal|model/.test(lower)) {
            return "🎨 **3D Modellashtirish** bo'yicha:\n\nBlender yoki o'yin dvigatellari haqida savol bering. Masalan:\n- Blender box modeling\n- Unity dasturiy ta'minot\n- 3D animatsiya asoslari";
        }

        return "❓ Iltimos, quyidagi 4 ta yo'nalishdan birini tanlang:\n\n1. 🤖 Robototexnika\n2. 💻 Web Dasturlash\n3. 🎬 Mobilografiya\n4. 🎨 3D Modellashtirish";
    }

    formatText(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\n/g, '<br>');
        return `<p>${text}</p>`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
}

// Global funksiya
window.setTopic = function(topic) {
    if (window.bot) {
        window.bot.setTopic(topic);
    }
};

// Bot ishga tushirish
window.bot = new IABot();
