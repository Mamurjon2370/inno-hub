// IA Bot - Texnologiya Yordamchisi
(function() {
    'use strict';

    let currentTopic = 'all';
    let chatMessages, userInput, sendBtn;

    // Ma'lumotlar bazasi (avvalgidek)

    function init() {
        chatMessages = document.getElementById('chatMessages');
        userInput = document.getElementById('userInput');
        sendBtn = document.getElementById('sendBtn');

        if (!chatMessages || !userInput || !sendBtn) {
            console.error('ELEMENTLAR TOPILMADI!', {
                chatMessages: !!chatMessages,
                userInput: !!userInput,
                sendBtn: !!sendBtn
            });
            return;
        }

        console.log('Elementlar topildi:', {
            chatMessages: chatMessages.id,
            userInput: userInput.id,
            sendBtn: sendBtn.id
        });

        // ASOSIY EVENT - CLICK (mousedown ham qo'shamiz)
        sendBtn.addEventListener('click', function(e) {
            console.log('CLICK EVENT ISHLADI!');
            e.preventDefault();
            e.stopPropagation();
            handleSend();
        });

        // Zaxira sifatida mousedown
        sendBtn.addEventListener('mousedown', function(e) {
            console.log('MOUSEDOWN EVENT!');
            e.preventDefault();
        });

        // Enter tugmasi
        userInput.addEventListener('keydown', function(e) {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        // Topic tugmalari
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentTopic = this.dataset.topic;
                const name = getTopicName(currentTopic);
                addBotMessage(`✅ **${name}** tanlandi! Savolingizni yozing.`);
            });
        });

        // Feature kartalari
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                const topic = this.dataset.topic;
                setTopic(topic);
                document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // QUICK BUTTONS (onclick uchun)
        window.setTopic = function(topic) {
            setTopic(topic);
        };

        console.log('Bot tayyor!');
    }

    function handleSend() {
        console.log('HANDLE SEND ISHLADI!');
        
        if (!userInput) {
            console.error('Input topilmadi!');
            return;
        }

        const text = userInput.value.trim();
        console.log('Input qiymati:', text);

        if (!text) {
            console.log('Bo\'sh xabar, jo\'natilmadi');
            return;
        }

        // Foydalanuvchi xabari
        addUserMessage(text);
        userInput.value = '';
        userInput.focus(); // Focus qaytarish

        // Typing
        showTyping();

        // Javob
        setTimeout(() => {
            hideTyping();
            const response = generateResponse(text);
            addBotMessage(response);
        }, 600);
    }

    function addUserMessage(text) {
        console.log('User xabari qo\'shildi:', text);
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
        console.log('Bot javobi:', text.substring(0, 50) + '...');
        const div = document.createElement('div');
        div.className = 'message bot-message';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">${formatText(text)}</div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
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

    function generateResponse(msg) {
        const lower = msg.toLowerCase();

        if (/salom|assalom|hello|hi/.test(lower)) {
            return "👋 Salom! Men IA Botman. Sizga quyidagi yo'nalishlarda yordam beraman:\n\n🤖 Robototexnika\n💻 Web Dasturlash\n🎬 Mobilografiya\n🎨 3D Modellashtirish\n\nQaysi mavzu haqida gaplashmoqchisiz?";
        }

        if (/rahmat|thank/.test(lower)) {
            return "😊 Arzimaydi! Boshqa savolingiz bo'lsa, bemalol so'rang!";
        }

        if (currentTopic === 'robototexnika' || /arduino|robot|sensor|motor/.test(lower)) {
            return "🤖 **Robototexnika** bo'yicha:\n\nArduino dasturlash, sensorlar va dvigatellar haqida savol bering. Masalan:\n- Arduino bilan LED yondirish\n- HC-SR04 masofa sensori\n- Servo motor nazorati";
        }

        if (currentTopic === 'web' || /html|css|javascript|react|web/.test(lower)) {
            return "💻 **Web Dasturlash** bo'yicha:\n\nFrontend yoki Backend haqida savol bering. Masalan:\n- HTML/CSS asoslari\n- JavaScript funksiyalar\n- React komponentlar";
        }

        if (currentTopic === 'mobilografiya' || /video|premiere|davinci|capcut|montaj/.test(lower)) {
            return "🎬 **Mobilografiya** bo'yicha:\n\nVideo montaj va rang korreksiyasi haqida savol bering. Masalan:\n- Premiere Pro montaj\n- DaVinci Resolve color grading\n- CapCut mobil montaj";
        }

        if (currentTopic === 'd3' || /blender|3d|unity|unreal|model/.test(lower)) {
            return "🎨 **3D Modellashtirish** bo'yicha:\n\nBlender yoki o'yin dvigatellari haqida savol bering. Masalan:\n- Blender box modeling\n- Unity dasturiy ta'minot\n- 3D animatsiya asoslari";
        }

        return "❓ Iltimos, quyidagi 4 ta yo'nalishdan birini tanlang:\n\n1. 🤖 Robototexnika\n2. 💻 Web Dasturlash\n3. 🎬 Mobilografiya\n4. 🎨 3D Modellashtirish";
    }

    function getTopicName(topic) {
        const names = {
            robototexnika: 'Robototexnika',
            web: 'Web Dasturlash',
            mobilografiya: 'Mobilografiya',
            d3: '3D Modellashtirish',
            all: 'Barchasi'
        };
        return names[topic] || topic;
    }

    function setTopic(topic) {
        currentTopic = topic;
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.topic === topic) btn.classList.add('active');
        });
        const name = getTopicName(topic);
        addBotMessage(`🎯 **${name}** yo'nalishi tanlandi! Savolingizni yozing.`);
    }

    function formatText(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\n/g, '<br>');
        return `<p>${text}</p>`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Ishga tushirish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
