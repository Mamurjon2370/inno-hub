document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const clearBtn = document.getElementById('clearBtn');
    const chatContainer = document.getElementById('chatContainer');
    
    let currentTopic = 'all';
    let isTyping = false;

    // Textarea avtomatik o'sishi
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if(this.value.trim() === '') {
            sendBtn.disabled = true;
        } else {
            sendBtn.disabled = false;
        }
    });

    // Enter bosilganda jo'natish (Shift+Enter yangi qator uchun)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener('click', sendMessage);

    // Mavzuni tanlash
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentTopic = e.currentTarget.dataset.topic;
        });
    });

    // Yangi suhbat
    clearBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        welcomeScreen.style.display = 'flex';
    });

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text || isTyping) return;

        // Ekranni tozalash va xabarni qo'shish
        welcomeScreen.style.display = 'none';
        appendMessage('user', text);
        
        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.disabled = true;
        
        // Typing indikatorini qo'shish
        const typingId = appendTypingIndicator();
        isTyping = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, topic: currentTopic })
            });
            
            const data = await response.json();
            removeMessage(typingId);
            
            if (data.success) {
                appendMessage('bot', data.text);
            } else {
                appendMessage('bot', `**Xatolik:** ${data.text}`);
            }
        } catch (error) {
            removeMessage(typingId);
            appendMessage('bot', '**Tarmoq xatosi:** Server bilan ulanib bo\'lmadi.');
        } finally {
            isTyping = false;
        }
    }

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        
        const avatar = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        // Agar bot bo'lsa, Markdown'ni HTML ga o'giramiz (marked.js orqali)
        const formattedText = sender === 'bot' ? marked.parse(text) : text.replace(/\n/g, '<br>');

        div.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${formattedText}</div>
        `;
        
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = `message bot-message`;
        div.id = id;
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">Javob yozilmoqda...</div>
            </div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
});
