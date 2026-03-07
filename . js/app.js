// IA Bot - Texnologiya Yordamchisi
// Faqat 4 ta yo'nalish: Robototexnika, Web, Mobilografiya, 3D

(function() {
    'use strict';

    // Global o'zgaruvchilar
    let currentTopic = 'all';
    let chatMessages, userInput, sendBtn;

    // Ma'lumotlar bazasi
    const knowledgeBase = {
        robototexnika: {
            keywords: ['robot', 'arduino', 'raspberry', 'sensor', 'dvigatel', 'motor', 'servo', 'stepper', 'iot', 'avtomat', 'robototexnika', 'elektronika', 'circuit', 'schema', 'ulash', 'dasturlash', 'c++', 'microcontroller', 'plc', 'avtomatlashtirish'],
            responses: {
                greeting: "🤖 Robototexnika bo'yicha yordamga tayyorman! Arduino, Raspberry Pi, sensorlar yoki avtomatlashtirish haqida savolingiz bormi?",
                arduino: "🔧 **Arduino** dasturlash bo'yicha:\n\n**Asosiy tushunchalar:**\n- `pinMode(pin, INPUT/OUTPUT)` - pin rejimi\n- `digitalWrite(pin, HIGH/LOW)` - raqamli signal\n- `analogRead(pin)` - analog o'qish (0-1023)\n- `delay(ms)` - kutish\n- `Serial.begin(9600)` - serial aloqa\n\n**Misol dastur (LED yoniq-o'chiq):**\n```cpp\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n```\n\nQaysi sensor yoki loyiha haqida batafsil ma'lumot kerak?",
                sensors: "📡 **Sensorlar turlari:**\n\n1. **Harorat sensorlari:**\n   - DHT11/DHT22 (namlik + harorat)\n   - DS18B20 (ancha aniq)\n   - LM35 (analog)\n\n2. **Masofa sensorlari:**\n   - HC-SR04 (ultrasonik)\n   - Sharp IR (infrqizil)\n\n3. **Harakat sensorlari:**\n   - PIR (HC-SR501)\n   - Accelerometer (MPU6050)\n\n4. **Boshqalar:**\n   - Gas sensor (MQ-2, MQ-135)\n   - Yorug'lik (LDR, BH1750)\n   - Namlik tuproq (FC-28)\n\nQaysi sensorni ulashni o'rganmoqchisiz?",
                motors: "⚙️ **Dvigatellar turlari:**\n\n**1. DC Motor:**\n- Oddiy o'zgaruvchan tezlik\n- L298N drayver bilan boshqarish\n- PWM orqali tezlik nazorati\n\n**2. Servo Motor (SG90, MG995):**\n- 0-180 gradus burchak\n- `servo.write(angle)`\n- Robot qo'llar, rul boshqarish\n\n**3. Stepper Motor (28BYJ-48, NEMA 17):**\n- Aniq pozitsion nazorat\n- 200 qadam/aylanma (1.8°)\n- CNC, 3D printerlar uchun\n\n**4. BLDC Motor:**\n- Yuqori samaradorlik\n- Dronlar, elektr transport\n\nQaysi dvigatel turini o'rganmoqchisiz?",
                projects: "🚀 **Robototexnika loyihalari:**\n\n**Boshlang'ich:**\n- Line follower robot\n- Obstacle avoidance (to'siqdan qochish)\n- Bluetooth bilan boshqarish\n\n**O'rta:**\n- 6 oyoqli robot (hexapod)\n- Robotic arm (robot qo'l)\n- Self-balancing robot\n\n**Murakkab:**\n- Autonomous robot (avtonom)\n- ROS (Robot Operating System)\n- Computer Vision bilan robot\n\nQaysi loyiha haqida ko'proq ma'lumot kerak?",
                default: "🤖 Robototexnika bo'yicha savolingizni aniqroq ayting. Men quyidagi mavzular haqida yordam beraman:\n- Arduino/Raspberry Pi dasturlash\n- Sensorlar ulash va sozlash\n- Dvigatellar nazorati\n- Elektronika sxemalari\n- IoT loyihalar\n- Avtomatlashtirish tizimlari"
            }
        },
        
        web: {
            keywords: ['web', 'sayt', 'html', 'css', 'javascript', 'js', 'react', 'vue', 'angular', 'node', 'python', 'django', 'flask', 'database', 'sql', 'frontend', 'backend', 'api', 'responsive', 'bootstrap', 'tailwind', 'dasturlash', 'kod', 'framework', 'library'],
            responses: {
                greeting: "💻 Web dasturlash bo'yicha yordamga tayyorman! Frontend (HTML/CSS/JS) yoki Backend (Node/Python) haqida savolingiz bormi?",
                html: "📝 **HTML (HyperText Markup Language):**\n\n**Asosiy teglar:**\n```html\n<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Sahifa nomi</title>\n</head>\n<body>\n    <header>Sarlavha</header>\n    <nav>Navigatsiya</nav>\n    <main>\n        <section>Bo'lim</section>\n        <article>Maqola</article>\n    </main>\n    <footer>Pastki qism</footer>\n</body>\n</html>\n```\n\n**Semantik teglar:** header, nav, main, section, article, aside, footer\n\n**Formalar:**\n```html\n<form>\n  <input type=\"text\" placeholder=\"Ism\" required>\n  <input type=\"email\" placeholder=\"Email\">\n  <button type=\"submit\">Yuborish</button>\n</form>\n```\n\nHTML bo'yicha qanday savolingiz bor?",
                css: "🎨 **CSS (Cascading Style Sheets):**\n\n**Flexbox (1D joylashuv):**\n```css\n.container {\n  display: flex;\n  justify-content: center; /* gorizontal */\n  align-items: center;       /* vertikal */\n  gap: 20px;\n  flex-wrap: wrap;\n}\n```\n\n**Grid (2D joylashuv):**\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\n**Zamonaviy xususiyatlar:**\n- `backdrop-filter: blur(10px)` - shaffof effekt\n- `clamp(1rem, 2.5vw, 2rem)` - responsive shrift\n- `aspect-ratio: 16/9` - nisbat\n- CSS Variables: `--primary: #6366f1`\n\n**Animation:**\n```css\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.element { animation: fadeIn 0.5s ease; }\n```\n\nCSS bo'yicha qanday savol?",
                javascript: "⚡ **JavaScript:**\n\n**Asosiy sintaksis:**\n```javascript\n// O'zgaruvchilar\nlet name = 'Ali';        // o'zgaruvchan\nconst PI = 3.14;         // doimiy\n\n// Funksiyalar\nfunction salom(ism) {\n  return `Salom, ${ism}!`;\n}\nconst kvadrat = (x) => x * x;  // arrow function\n\n// Array metodlari\nconst sonlar = [1, 2, 3, 4, 5];\nconst juft = sonlar.filter(x => x % 2 === 0);\nconst kvdrt = sonlar.map(x => x ** 2);\n\n// Async/await\nasync function malumotOlish() {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  return data;\n}\n```\n\n**DOM manipulyatsiya:**\n```javascript\ndocument.querySelector('.class');\nelement.addEventListener('click', handler);\nelement.classList.add('active');\nelement.style.color = 'red';\n```\n\nQaysi JS mavzusi haqida batafsil?",
                react: "⚛️ **React.js:**\n\n**Komponent yaratish:**\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Hisob: ${count}`;\n  }, [count]);\n  \n  return (\n    <div>\n      <p>Hisob: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>\n        +\n      </button>\n    </div>\n  );\n}\n```\n\n**Hooks:**\n- `useState` - holat boshqaruvi\n- `useEffect` - side effects\n- `useContext` - global holat\n- `useRef` - DOM reference\n\n**Props o'tkazish:**\n```jsx\nfunction Parent() {\n  return <Child name=\"Ali\" age={25} />;\n}\nfunction Child({ name, age }) {\n  return <div>{name} - {age} yosh</div>;\n}\n```\n\nReact bo'yicha qanday savol?",
                backend: "🖥️ **Backend dasturlash:**\n\n**Node.js + Express:**\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\n// GET so'rov\napp.get('/api/users', (req, res) => {\n  res.json({ users: [] });\n});\n\n// POST so'rov\napp.post('/api/users', (req, res) => {\n  const { name, email } = req.body;\n  // Ma'lumotni saqlash\n  res.status(201).json({ message: 'Yaratildi' });\n});\n\napp.listen(3000);\n```\n\n**Python (Flask):**\n```python\nfrom flask import Flask, jsonify, request\napp = Flask(__name__)\n\n@app.route('/api/data', methods=['GET', 'POST'])\ndef data():\n    if request.method == 'POST':\n        data = request.get_json()\n        return jsonify({'status': 'success'})\n    return jsonify({'data': []})\n```\n\n**Database (SQL):**\n```sql\nSELECT * FROM users WHERE age > 18;\nINSERT INTO users (name, email) VALUES ('Ali', 'ali@mail.com');\n```\n\nBackend qismi haqida qanday savol?",
                default: "💻 Web dasturlash bo'yicha savolingizni aniqroq ayting. Men quyidagi mavzular haqida yordam beraman:\n- HTML5 semantik teglar\n- CSS3 (Flexbox, Grid, Animation)\n- JavaScript (ES6+)\n- React.js, Vue.js, Angular\n- Node.js, Python (Django/Flask)\n- Ma'lumotlar bazasi (SQL/NoSQL)\n- REST API yaratish\n- Responsive dizayn"
            }
        },
        
        mobilografiya: {
            keywords: ['video', 'montaj', 'premiere', 'davinci', 'after', 'effects', 'capcut', 'mobilografiya', 'kamera', 'shooting', 'color', 'grading', 'transition', 'effekt', 'sound', 'audio', 'youtube', 'tiktok', 'reels', 'shorts', 'content', 'creator'],
            responses: {
                greeting: "🎬 Mobilografiya va videomontaj bo'yicha yordamga tayyorman! Premiere Pro, DaVinci Resolve yoki mobil ilovalar haqida savolingiz bormi?",
                premiere: "🎞️ **Adobe Premiere Pro:**\n\n**Asosiy interfeys:**\n- **Project Panel** - loyiha fayllari\n- **Timeline** - montaj oynasi (V1, V2 - video; A1, A2 - audio)\n- **Program Monitor** - ko'rish oynasi\n- **Source Monitor** - manba ko'rish\n\n**Tezkor tugmalar:**\n- `C` - Razor (kesish)\n- `V` - Selection (tanlash)\n- `Ctrl+K` - playhead da kesish\n- `Ctrl+M` - eksport\n- `L` - tezlik bilan o'ynash (2x, 3x)\n\n**Muhim funksiyalar:**\n1. **Lumetri Color** - rang korreksiyasi\n2. **Essential Graphics** - titrlar\n3. **Audio Track Mixer** - ovoz sozlash\n4. **Proxy workflow** - katta fayllar uchun\n\nPremiere bo'yicha qanday savol?",
                davinci: "🎨 **DaVinci Resolve (BEPUL!):**\n\n**5 ta sahifa:**\n1. **Media** - import/organizatsiya\n2. **Cut** - tezkor montaj\n3. **Edit** - professional montaj\n4. **Fusion** - VFX (After Effects o'rnini bosadi)\n5. **Color** - rang korreksiyasi (eng kuchli!)\n6. **Fairlight** - audio post-produksiya\n7. **Deliver** - eksport\n\n**Color grading:**\n```\nNodes tizimi:\n- Serial nodes (ketma-ket)\n- Parallel nodes (parallel)\n- Layer nodes (qatlamli)\n\nAsosiy o'zgarishlar:\n- Lift (soya)\n- Gamma (o'rta ton)\n- Gain (yorug' qism)\n- Offset (umumiy)\n```\n\n**Fusion (VFX):**\n- Keying (green screen)\n- Tracking (harakat kuzatish)\n- Particles (zarrachalar)\n- 3D compositing\n\nDaVinci bo'yicha qanday savol?",
                mobile: "📱 **Mobilografiya (Telefon bilan suratga olish):**\n\n**Suratga olish texnikasi:**\n1. **Rule of Thirds** - uchlarga bo'lish\n2. **Leading Lines** - yo'naltiruvchi chiziqlar\n3. **Symmetry** - simmetriya\n4. **Golden Hour** - oltin soat (sunrise/sunset)\n\n**Stabilizatsiya:**\n- Gimbal (DJI OM, Zhiyun)\n- Telefon stabilizatori\n- Slow motion (120fps, 240fps)\n\n**Mobil montaj ilovalari:**\n- **CapCut** - eng mashhur, bepul\n- **VN Editor** - professional, bepul\n- **Adobe Rush** - Adobe ekotizimi\n- **InShot** - oddiy va qulay\n\n**CapCut funksiyalari:**\n- Auto captions (avtomatik subtitr)\n- Keyframe animation\n- Chroma key (yashil fon)\n- Trend effektlar\n\nMobilografiya haqida qanday savol?",
                color: "🌈 **Rang korreksiyasi (Color Grading):**\n\n**Asosiy tushunchalar:**\n- **Exposure** - ekspozitsiya (yorug'lik)\n- **Contrast** - kontrast\n- **White Balance** - oq balans (issiq/sovuq)\n- **Saturation** - rang boyligi\n- **Hue** - rang turi\n\n**3-way color corrector:**\n```\nShadows (Soyalarda):\n- Qizil qo'shish = issiq\n- Ko'k qo'shish = sovuq\n\nMidtones (O'rta tonlar):\n- Tanni rang\n- Tana rangi korreksiyasi\n\nHighlights (Yorug' qismlar):\n- Osmon rangi\n- Yorug'lik effektlari\n```\n\n**LUTs (Look-Up Tables):**\n- Cinematic LUTs (kinematografik)\n- Vintage LUTs (eski uslub)\n- Teal & Orange (eng mashhur)\n- Custom LUT yaratish\n\nQaysi dasturda rang korreksiyasi qilishni xohlaysiz?",
                effects: "✨ **Video effektlar:**\n\n**Transitions (O'tishlar):**\n- Cut (kesish) - eng tezkor\n- Dissolve (erish) - yumshoq\n- Slide (siljish) - zamonaviy\n- Zoom (yaqinlashish) - dramatik\n- Morph (o'zgarish) - professional\n\n**After Effects effektlari:**\n1. **Motion Graphics:**\n   - Text animation\n   - Logo reveal\n   - Lower thirds\n\n2. **VFX:**\n   - Green screen (Keylight)\n   - Motion tracking\n   - Rotoscoping\n   - Particle systems\n\n3. **3D:**\n   - Element 3D (plugin)\n   - Camera tracking\n   - 3D text\n\n**Tezkor After Effects:**\n```\nExpression (avtomatlash):\nwiggle(2, 30) - titrash effekti\nloopOut() - animatsiyani takrorlash\n```\n\nQaysi effekt haqida batafsil ma'lumot kerak?",
                youtube: "📺 **YouTube/TikTok kontent yaratish:**\n\n**YouTube formatlari:**\n- **Long-form** (10-60 daqiqa) - ta'lim, vlog\n- **Shorts** (60 sekund gacha) - qisqa, tezkor\n- **Live** - jonli efir\n\n**TikTok/Reels muvaffaqiyati:**\n1. **Hook (0-3 sekund):** Diqqatni tortish\n2. **Storytelling:** Qiziqarli hikoya\n3. **CTA (Call to Action):** Obuna bo'lish, like\n4. **Trends:** Mashqurlar musiqasi, effektlar\n\n**Audio muhimligi:**\n- Royalty-free music (Epidemic Sound, Artlist)\n- Sound effects (Freesound.org)\n- Voice over (ovoz yozish)\n- Noise reduction (shovqinni kamaytirish)\n\n**Thumbnails (Miniatyuralar):**\n- Yuz ifodasi (katta, aniq)\n- Kontrast ranglar\n- 3-5 so'z (katta shrift)\n- 1280x720 o'lcham\n\nKontent yaratish haqida qanday savol?",
                default: "🎬 Mobilografiya bo'yicha savolingizni aniqroq ayting. Men quyidagi mavzular haqida yordam beraman:\n- Adobe Premiere Pro montaj\n- DaVinci Resolve (rang korreksiyasi)\n- After Effects (VFX)\n- Mobil ilovalar (CapCut, VN)\n- Suratga olish texnikasi\n- Rang korreksiyasi (Color Grading)\n- YouTube/TikTok kontent strategiyasi\n- Audio post-produksiya"
            }
        },
        
        d3: {
            keywords: ['3d', 'blender', '3ds', 'max', 'maya', 'unity', 'unreal', 'model', 'modeling', 'render', 'rendering', 'animation', 'rigging', 'texturing', 'sculpting', 'lowpoly', 'highpoly', 'mesh', 'uv', 'lighting', 'camera', 'vfx', 'game', 'asset'],
            responses: {
                greeting: "🎨 3D modellashtirish bo'yicha yordamga tayyorman! Blender, 3ds Max, yoki o'yin dvigatellari haqida savolingiz bormi?",
                blender: "🟠 **Blender (BEPUL va KUCHLI!):**\n\n**Interfeys rejimlari:**\n- **Layout** - umumiy ish oynasi\n- **Modeling** - 3D model yaratish\n- **Sculpting** - haykaltaroshlik\n- **UV Editing** - tekstura koordinatalari\n- **Texture Paint** - tekstura chizish\n- **Shading** - material sozlash\n- **Animation** - animatsiya\n- **Rendering** - render (Cycles/Eevee)\n\n**Asosiy tugmalar:**\n- `Tab` - Edit/Object rejimi\n- `G` - siljitish (grab)\n- `S` - masshtab (scale)\n- `R` - aylantirish (rotate)\n- `E` - extrude (cho'zish)\n- `Ctrl+R` - loop cut\n- `Shift+A` - ob'ekt qo'shish\n\n**Modifiers (modifikatorlar):**\n- Subdivision Surface (silliq)\n- Mirror (o'ng-chap simmetriya)\n- Boolean (kesish/qo'shish)\n- Array (massiv)\n- Bevel (burchak yumshatish)\n\nBlender bo'yicha qanday savol?",
                modeling: "📐 **3D Modeling texnikalari:**\n\n**Modeling usullari:**\n1. **Box Modeling:**\n   - Oddiy kubdan boshlash\n   - Extrude, loop cut\n   - Hard surface modeling\n\n2. **Sculpting:**\n   - Dynamic Topology\n   - Multiresolution\n   - Brushes (Draw, Smooth, Grab)\n\n3. **Polygon Modeling:**\n   - Vertex, Edge, Face\n   - Ngons vs Quads\n   - Topology (sirkulyatsiya)\n\n**Low Poly vs High Poly:**\n- **Low Poly** (< 10k poligon) - o'yinlar, real-time\n- **High Poly** (millionlab) - film, render\n- **Retopology** - high poly dan low poly yaratish\n- **Normal Baking** - detallarni o'tkazish\n\n**Muhim qoidalar:**\n- Quads ishlatish (to'rtburchak)\n- Clean topology\n- Proper edge flow\n- Non-manifold tekshirish\n\nQaysi modeling usuli haqida batafsil?",
                texturing: "🖼️ **Teksturlash (Texturing):**\n\n**UV Mapping:**\n```\n1. Mark Seam (kesish chizig'i)\n2. Unwrap (yoyish)\n3. Pack Islands (joylash)\n4. Export UV Layout\n```\n\n**Tekstura turlari:**\n- **Diffuse/Albedo** - asosiy rang\n- **Normal Map** - yuzaki detallar (to'siq qilmaydi)\n- **Roughness** - sershovqinlik\n- **Metallic** - metallik qism\n- **AO (Ambient Occlusion)** - soyalar\n- **Displacement** - haqiqiy qavariqlik\n\n**PBR (Physically Based Rendering):**\n- Haqiqiy dunyo qoidalariga asoslangan\n- Metallic workflow\n- Specular workflow\n\n**Tekstura yaratish dasturlari:**\n- Substance Painter (eng professional)\n- Substance Designer (protsedural)\n- Quixel Mixer (bepul)\n- Photoshop (oddiy)\n\nTeksturlash haqida qanday savol?",
                rendering: "📸 **Rendering (Tasvirga olish):**\n\n**Blender Cycles:**\n- Ray tracing (nur kuzatish)\n- Realistic render\n- Sekin, lekin sifatli\n- GPU render (CUDA/OptiX)\n\n**Blender Eevee:**\n- Real-time render\n- O'yin dvigateli kabi\n- Tez, lekin kamroq realistik\n\n**Render sozlamalari:**\n```\nCycles:\n- Samples: 128 (preview), 2048 (final)\n- Denoising - shovqinni yo'qotish\n- Caustics - nur sinish (suyuqlik, oyna)\n\nEevee:\n- Screen Space Reflections\n- Ambient Occlusion\n- Bloom (yorug'lik nurlanishi)\n```\n\n**3ds Max + V-Ray/Corona:**\n- Industry standard (arxitektura)\n- Photorealistic render\n- Material library\n- LightMix (yorug'lik nazorati)\n\nRendering haqida qanday savol?",
                animation: "🎬 **3D Animatsiya:**\n\n**Rigging ( Skelet yaratish):**\n```\n1. Armature (skelet) qo'shish\n2. Bones (suyaklar) joylash\n3. Weight Painting (ta'sir kuchi)\n4. IK/FK (Inverse/Forward Kinematics)\n5. Constraints (cheklashlar)\n```\n\n**Animatsiya turlari:**\n- **Keyframe** - asosiy\n- **Physics** - fizika (tashlanish, suyuqlik)\n- **Motion Capture** - harakat yozish\n- **Procedural** - avtomatik (daraht, soch)\n\n**12 ta animatsiya tamoyili (Disney):**\n1. Squash and Stretch (siqish cho'zish)\n2. Anticipation (kutish)\n3. Staging (sahna)\n4. Straight Ahead/Pose to Pose\n5. Follow Through (ortidan kelish)\n6. Slow In and Slow Out\n7. Arcs (yoylar)\n8. Secondary Action\n9. Timing\n10. Exaggeration (oshirish)\n11. Solid Drawing\n12. Appeal (joziba)\n\n**Shape Keys** - yuz ifodalari (blend shapes)\n\nAnimatsiya haqida qanday savol?",
                game: "🎮 **O'yin dvigatellari (Game Engines):**\n\n**Unity:**\n- C# dasturlash\n- Asset Store (tayyor resurslar)\n- 2D va 3D\n- Mobile, PC, Console, VR/AR\n- Visual Scripting (kod yozmasdan)\n\n**Unreal Engine:**\n- Blueprints (vizual dasturlash)\n- C++ (chuqur dasturlash)\n- Nanite (cheksiz geometriya)\n- Lumen (real-time yorug'lik)\n- MetaHuman (realistik odamlar)\n\n**Godot (BEPUL):**\n- GDScript (Python o'xshash)\n- Yengil va tez\n- Open source\n\n**O'yin assetlari:**\n- **Models:** .fbx, .obj, .gltf\n- **Textures:** .png, .jpg, .tga\n- **Animations:** .fbx\n- **Audio:** .wav, .mp3\n\n**Optimization:**\n- LOD (Level of Detail)\n- Occlusion Culling\n- Texture Atlasing\n- Object Pooling\n\nO'yin dvigatellari haqida qanday savol?",
                default: "🎨 3D modellashtirish bo'yicha savolingizni aniqroq ayting. Men quyidagi mavzular haqida yordam beraman:\n- Blender/3ds Max/Maya\n- 3D modeling (Box, Sculpting)\n- UV Mapping va Texturing\n- Material va Shading\n- Rendering (Cycles, V-Ray)\n- Rigging va Animation\n- Unity/Unreal Engine\n- O'yin assetlari yaratish"
            }
        }
    };

    // DOM yuklangandan keyin ishga tushirish
    function init() {
        // Elementlarni olish
        chatMessages = document.getElementById('chatMessages');
        userInput = document.getElementById('userInput');
        sendBtn = document.getElementById('sendBtn');

        if (!chatMessages || !userInput || !sendBtn) {
            console.error('Elementlar topilmadi!');
            return;
        }

        // Eventlarni ulash
        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        // Topic tugmalari
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', function() {
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

        console.log('Bot ishga tushdi!');
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        // Foydalanuvchi xabari
        addUserMessage(text);
        userInput.value = '';

        // Typing
        showTyping();

        // Javob
        setTimeout(() => {
            hideTyping();
            const response = generateResponse(text);
            addBotMessage(response);
        }, 800);
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

        // Salom
        if (/salom|assalom|hello|hi/.test(lower)) {
            return "👋 Assalomu Alaykum ! Men INNO HUB. Sizga quyidagi yo'nalishlarda yordam beraman:\n\n🤖 Robototexnika\n💻 Web Dasturlash\n🎬 Mobilografiya\n🎨 3D Modellashtirish\n\nQaysi mavzu haqida gaplashmoqchisiz?";
        }

        // Rahmat
        if (/rahmat|thank/.test(lower)) {
            return "😊 Arzimaydi! Boshqa savolingiz bo'lsa, bemalol so'rang!";
        }

        // Yo'nalishlar bo'yicha
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

    // Global funksiya
    window.setTopic = setTopic;

    // Ishga tushirish
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
