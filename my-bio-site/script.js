// ===== МЕНЮ =====
function toggleMenu() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.menu-container');
    const dropdown = document.getElementById('dropdownMenu');
    if (!menuContainer.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// ===== ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ =====
function showPage(pageName, element) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('dropdownMenu').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ЗВУКИ =====
const sounds = {
    click: new Audio('sounds/click.mp3'),
    hover: new Audio('sounds/hover.mp3'),
    rickroll: new Audio('sounds/gonna give u up.mp3'),
    skibidi: new Audio('sounds/my-mommy-said-no-more-skibidi-toilet.mp3'),
    socialDown: new Audio('sounds/-social credit.mp3'),
    socialUp: new Audio('sounds/+999 social credit.mp3')
};

Object.values(sounds).forEach(sound => {
    sound.volume = 0.3;
});

function playClickSound() {
    sounds.click.currentTime = 0;
    sounds.click.play().catch(() => {});
}

function playHoverSound() {
    sounds.hover.currentTime = 0;
    sounds.hover.play().catch(() => {});
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button, .menu-btn, .credit-btn, .rickroll-btn').forEach(btn => {
        btn.addEventListener('click', playClickSound);
        btn.addEventListener('mouseenter', playHoverSound);
    });
    
    document.querySelectorAll('a, .contact-card-bg, .bio-card, .quote-card, .game-item, .tech-item').forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
    });
});

// ===== ПАСХАЛКИ =====
function playRickroll() {
    sounds.rickroll.currentTime = 0;
    sounds.rickroll.volume = 0.5;
    sounds.rickroll.play().catch(() => {});
    
    // Визуальный эффект
    const btn = document.querySelector('.rickroll-btn');
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = '', 300);
}

function playSkibidi() {
    sounds.skibidi.currentTime = 0;
    sounds.skibidi.volume = 0.5;
    sounds.skibidi.play().catch(() => {});
    
    const btn = document.querySelector('.skibidi-btn');
    btn.style.animation = 'none';
    setTimeout(() => {
        btn.style.animation = 'skibidiPulse 2s infinite';
    }, 10);
}

// ===== SOCIAL CREDIT =====
let socialCredit = parseInt(localStorage.getItem('socialCredit') || '0');
document.getElementById('creditCount').textContent = socialCredit;

function addCredit(amount) {
    socialCredit += amount;
    document.getElementById('creditCount').textContent = socialCredit;
    localStorage.setItem('socialCredit', socialCredit);
    
    if (amount > 0) {
        sounds.socialUp.currentTime = 0;
        sounds.socialUp.volume = 0.5;
        sounds.socialUp.play().catch(() => {});
    } else {
        sounds.socialDown.currentTime = 0;
        sounds.socialDown.volume = 0.5;
        sounds.socialDown.play().catch(() => {});
    }
    
    // Анимация счётчика
    const counter = document.getElementById('creditCount');
    counter.style.transform = 'scale(1.3)';
    setTimeout(() => counter.style.transform = '', 300);
}

// ===== ФОНОВАЯ МУЗЫКА =====
const bgMusic = document.getElementById('bgMusic');
bgMusic.loop = true;
bgMusic.volume = 0.25;

// Автозапуск после первого клика
let musicStarted = false;
document.addEventListener('click', function() {
    if (!musicStarted) {
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }
}, { once: true });

function toggleBgMusic() {
    const btn = document.getElementById('playPauseBtn');
    if (bgMusic.paused) {
        bgMusic.play();
        btn.innerHTML = '<i class="fas fa-pause"></i> <span data-key="pause">Пауза</span>';
    } else {
        bgMusic.pause();
        btn.innerHTML = '<i class="fas fa-play"></i> <span data-key="play">Играть</span>';
    }
}

function changeBgMusic(file, element) {
    bgMusic.src = 'sounds/' + file;
    bgMusic.play();
    musicStarted = true;
    
    document.querySelectorAll('.music-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    
    localStorage.setItem('bgMusic', file);
}

// ===== ГРОМКОСТЬ =====
const bgVolumeSlider = document.getElementById('bgVolume');
const bgVolumeValue = document.getElementById('bgVolumeValue');
const sfxVolumeSlider = document.getElementById('sfxVolume');
const sfxVolumeValue = document.getElementById('sfxVolumeValue');

bgVolumeSlider.addEventListener('input', function() {
    const val = this.value / 100;
    bgMusic.volume = val;
    bgVolumeValue.textContent = this.value + '%';
    localStorage.setItem('bgVolume', this.value);
});

sfxVolumeSlider.addEventListener('input', function() {
    const val = this.value / 100;
    Object.values(sounds).forEach(s => s.volume = val);
    sfxVolumeValue.textContent = this.value + '%';
    localStorage.setItem('sfxVolume', this.value);
});

// ===== ФОНОВОЕ ИЗОБРАЖЕНИЕ =====
function changeBackground(file, element) {
    const bg = document.querySelector('.cosmic-background');
    
    if (file === 'none') {
        bg.classList.remove('bg-image');
        bg.style.backgroundImage = '';
    } else {
        bg.classList.add('bg-image');
        bg.style.backgroundImage = `url('images/${file}')`;
    }
    
    document.querySelectorAll('.bg-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    
    localStorage.setItem('bgImage', file);
}

// ===== ЗАГРУЗКА НАСТРОЕК =====
window.addEventListener('load', function() {
    // Язык
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== 'ru') {
        changeLanguage(savedLang);
    }
    
    // Громкость
    const savedBgVol = localStorage.getItem('bgVolume');
    if (savedBgVol !== null) {
        bgVolumeSlider.value = savedBgVol;
        bgVolumeValue.textContent = savedBgVol + '%';
        bgMusic.volume = savedBgVol / 100;
    }
    
    const savedSfxVol = localStorage.getItem('sfxVolume');
    if (savedSfxVol !== null) {
        sfxVolumeSlider.value = savedSfxVol;
        sfxVolumeValue.textContent = savedSfxVol + '%';
        Object.values(sounds).forEach(s => s.volume = savedSfxVol / 100);
    }
    
    // Фоновая музыка
    const savedMusic = localStorage.getItem('bgMusic');
    if (savedMusic) {
        bgMusic.src = 'sounds/' + savedMusic;
        document.querySelectorAll('.music-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.onclick.toString().includes(savedMusic)) {
                opt.classList.add('active');
            }
        });
    }
    
    // Фон
    const savedBg = localStorage.getItem('bgImage');
    if (savedBg) {
        const bg = document.querySelector('.cosmic-background');
        if (savedBg === 'none') {
            bg.classList.remove('bg-image');
        } else {
            bg.classList.add('bg-image');
            bg.style.backgroundImage = `url('images/${savedBg}')`;
            document.querySelectorAll('.bg-option').forEach(opt => {
                opt.classList.remove('active');
                if (opt.onclick.toString().includes(savedBg)) {
                    opt.classList.add('active');
                }
            });
        }
    }
    
    // Анимации
    const cards = document.querySelectorAll('.bio-card, .contact-card-bg, .hobby-block, .quote-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== ПЕРЕВОДЫ =====
const translations = {
    ru: {
        menu: "Menu", nav_home: "Home", nav_contacts: "Contacts",
        nav_hobbies: "Увлечения", nav_quotes: "Цитаты", nav_settings: "Настройки",
        welcome_title: "Добро пожаловать",
        welcome_text: "ко мне на сайт, здесь вы можете узнать обо мне немного побольше, а так-же найти мои контактные данные. Если хотите начать общаться — не бойтесь начинать диалог, я не кусаюсь и не вспыльчив.",
        bio_profession_title: "Профессия", bio_profession_text: "Учусь на программиста",
        bio_age_title: "Возраст", bio_age_text: "18 лет",
        bio_name_title: "Имя", bio_name_text: "Мори / Морис",
        contacts_title: "Мои контакты", spotify_text: "Моя музыка", steam_text: "Мой профиль",
        hobbies_title: "Мои увлечения", english_title: "Изучение английского языка",
        level_intermediate: "Intermediate",
        english_desc: "Средний уровень — могу общаться на большинство тем",
        programming_title: "Программирование",
        programming_desc: "Делаю много бесполезной фигни для автоматизации абстрактных процессов ^^",
        games_title: "Любимые игры", rank_1: "1 место", rank_2: "2 место", rank_3: "3 место",
        hours: "часов", quotes_title: "Мои цитаты",
        quote_1: "Ошибка и ты ошибся",
        quote_2: "В автобусе место я бабкам не уступаю, ведь бабки в жизни не главное",
        quote_3: "Сила не в бабках, ведь бабки уже старые",
        quote_4: "Не учи меня как жить, никто лучше меня не знает как всё испортить",
        quote_5: "Зови меня дед, ведь меня интересуют только бабки",
        quote_6: "Скажи мне, кто твой друг, и оба идите нахер",
        quote_7: "Тут – это вам не там, это там, где здесь",
        quote_8: "Завтра рано вставать, встану послезавтра",
        quote_9: "Никогда не откладывай на завтра то, на что можно забить сегодня",
        quote_10: "Если заблудился в лесу, иди домой",
        quote_11: "Девушка вынашивает ребенка 9 месяцев. Я выношу его с одного удара",
        quote_12: "Собакам нельзя доверять, потому что они издают Lie",
        quote_13: "Не яйца красят человека, а человек яйца",
        quote_14: "Пары не удары, можно и пропустить. Учеба не Усейн Болт, не убежит",
        quote_15: "Если паническая атака неизбежна, атакуй первым",
        quote_16: "Алкоголизм – это страшно, но я не из трусливых",
        quote_17: "Дают – бери, не дают – отбери",
        quote_18: "Когда женщина поднимает руку, она перестает быть женщиной и становится спарринг-партнером",
        quotes_footer: "Если захотите, чтобы я сделал ещё — можете сказать, я подумаю ^^",
        rickroll_text: "Нажми меня", social_credit_title: "Оцените сайт",
        social_credit_label: "Social Credit", dislike: "Dislike", like: "Like",
        settings_title: "Настройки", volume_title: "Громкость",
        bg_music_label: "Фоновая музыка", sfx_label: "Звуковые эффекты",
        bg_image_title: "Фоновое изображение", bg_cosmic: "Космический",
        bg_music_select_title: "Фоновая музыка", pause: "Пауза", play: "Играть"
    },
    en: {
        menu: "Menu", nav_home: "Home", nav_contacts: "Contacts",
        nav_hobbies: "Hobbies", nav_quotes: "Quotes", nav_settings: "Settings",
        welcome_title: "Welcome",
        welcome_text: "to my site, here you can learn a little more about me, as well as find my contact details. If you want to start communicating — don't be afraid to start a dialogue, I don't bite and I'm not hot-tempered.",
        bio_profession_title: "Profession", bio_profession_text: "Studying to be a programmer",
        bio_age_title: "Age", bio_age_text: "18 years old",
        bio_name_title: "Name", bio_name_text: "Mori / Maurice",
        contacts_title: "My Contacts", spotify_text: "My Music", steam_text: "My Profile",
        hobbies_title: "My Hobbies", english_title: "Learning English",
        level_intermediate: "Intermediate",
        english_desc: "Intermediate level — I can communicate on most topics",
        programming_title: "Programming",
        programming_desc: "I make a lot of useless stuff for automating abstract processes ^^",
        games_title: "Favorite Games", rank_1: "1st place", rank_2: "2nd place", rank_3: "3rd place",
        hours: "hours", quotes_title: "My Quotes",
        quote_1: "One mistake and you're mistaken",
        quote_2: "I don't give up my seat on the bus to old ladies, because money isn't the main thing in life",
        quote_3: "Strength is not in money, because money is already old",
        quote_4: "Don't teach me how to live, no one knows better than me how to mess everything up",
        quote_5: "Call me grandpa, because I'm only interested in money",
        quote_6: "Tell me who your friend is, and both of you go to hell",
        quote_7: "Here is not there, it's there where here is",
        quote_8: "Tomorrow I have to get up early, I'll get up the day after tomorrow",
        quote_9: "Never put off until tomorrow what you can blow off today",
        quote_10: "If you're lost in the forest, go home",
        quote_11: "A girl carries a child for 9 months. I can carry him with one punch",
        quote_12: "You can't trust dogs because they make Lie",
        quote_13: "It's not the balls that make the man, but the man makes the balls",
        quote_14: "Couples are not hits, you can skip them. Studies are not Usain Bolt, they won't run away",
        quote_15: "If a panic attack is inevitable, attack first",
        quote_16: "Alcoholism is scary, but I'm not a coward",
        quote_17: "If they give – take, if they don't give – take it",
        quote_18: "When a woman raises her hand, she stops being a woman and becomes a sparring partner",
        quotes_footer: "If you want me to make more — you can tell me, I'll think about it ^^",
        rickroll_text: "Click me", social_credit_title: "Rate the site",
        social_credit_label: "Social Credit", dislike: "Dislike", like: "Like",
        settings_title: "Settings", volume_title: "Volume",
        bg_music_label: "Background Music", sfx_label: "Sound Effects",
        bg_image_title: "Background Image", bg_cosmic: "Cosmic",
        bg_music_select_title: "Background Music", pause: "Pause", play: "Play"
    }
};

let currentLang = 'ru';

function changeLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-ru').classList.remove('active');
    document.getElementById('lang-en').classList.remove('active');
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('language', lang);
}