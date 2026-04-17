/* ============================================================
   MUSEO ALBERTO MENA CAAMAÑO — main.js
   Handles: Loader, Scroll Progress, Theme Toggle,
            Mobile Nav, Lightbox, Quiz
   ============================================================ */

// ── LOADER ──────────────────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1600);
});

// ── SCROLL PROGRESS BAR ──────────────────────────────────────
function updateScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── PARALLAX HERO ────────────────────────────────────────────
function updateParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${scrollY * 0.25}px)`;
}
window.addEventListener('scroll', updateParallax, { passive: true });

// ── THEME TOGGLE ─────────────────────────────────────────────
const themeBtn   = document.getElementById('theme-btn');
const themeIcon  = document.getElementById('theme-icon');
const DARK_KEY   = 'museo-theme';

function applyTheme(mode) {
    document.body.classList.toggle('light', mode === 'light');
    if (themeIcon) themeIcon.textContent = mode === 'light' ? '🌙' : '☀️';
    localStorage.setItem(DARK_KEY, mode);
}

// Init from localStorage
const savedTheme = localStorage.getItem(DARK_KEY) || 'dark';
applyTheme(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const current = document.body.classList.contains('light') ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
    });
}

// ── MOBILE HAMBURGER ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (mobileNav.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => {
                s.style.transform = ''; s.style.opacity = '';
            });
        });
    });
}

// ── LIGHTBOX ─────────────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lb-img');
const lbCaption   = document.getElementById('lb-caption');
const lbClose     = document.getElementById('lb-close');

function openLightbox(src, caption) {
    if (!lightbox) return;
    lbImg.src = src;
    if (lbCaption) lbCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 300);
}

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Bind gallery items
document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
        openLightbox(item.dataset.src, item.dataset.caption || '');
    });
});

// ── QUIZ ENGINE ──────────────────────────────────────────────
const PREGUNTAS = [
    {
        pregunta: '¿Cuál es el nombre de la exposición permanente principal del museo?',
        opciones: ['Quito Colonial', 'De Quito al Ecuador (1736-1830)', 'La Independencia', 'El Primer Grito'],
        correcta: 1,
        feedback: 'La exposición "De Quito al Ecuador (1736-1830)" abarca desde la llegada de la misión geodésica francesa hasta la anexión a la Gran Colombia.'
    },
    {
        pregunta: '¿En qué año fue creado el Museo Alberto Mena Caamaño mediante ordenanza municipal?',
        opciones: ['1959', '1970', '1957', '1810'],
        correcta: 2,
        feedback: 'Fue creado el 28 de mayo de 1957, a partir del fondo donado por el filántropo Alberto Mena Caamaño al Municipio de Quito.'
    },
    {
        pregunta: '¿Qué evento histórico se recrea con figuras de cera en el Museo?',
        opciones: ['Batalla de Pichincha', 'Primer Grito de Independencia (1809)', 'Masacre del 2 de agosto de 1810', 'Fundación de Quito'],
        correcta: 2,
        feedback: 'La sala temática sobre la Masacre del 2 de agosto de 1810 es la más emblemática. Fue añadida en 1970 con figuras del artista Francisco Barbieri.'
    },
    {
        pregunta: '¿Dónde está ubicado el museo?',
        opciones: ['El Panecillo, Quito', 'Centro Histórico de Quito', 'La Mariscal, Quito', 'Parque La Carolina'],
        correcta: 1,
        feedback: 'Se encuentra en el Centro Histórico de Quito, sobre la calle Espejo, junto al Palacio de Carondelet, formando parte del Centro Cultural Metropolitano.'
    },
    {
        pregunta: '¿Cuántos días a la semana atiende el museo?',
        opciones: ['Solo fines de semana', 'Lunes a Viernes', 'Martes a Domingo (6 días)', 'Todos los días'],
        correcta: 2,
        feedback: 'El museo abre de Martes a Domingo en horario de 09:00 a 16:30. Los lunes permanece cerrado.'
    },
    {
        pregunta: '¿Cuántas piezas aproximadamente conforman la colección actual del museo?',
        opciones: ['600 piezas', '2.000 piezas', '5.819 piezas', '10.000 piezas'],
        correcta: 2,
        feedback: 'Partiendo de las 600 piezas originales donadas por Mena Caamaño, la colección creció hasta las 5.819 piezas actuales.'
    },
    {
        pregunta: '¿Cuál era el nombre original del edificio que ocupa el museo?',
        opciones: ['Palacio de Gobierno', 'Cuartel Real de Lima', 'Casa de la Cultura', 'Presidio Nacional'],
        correcta: 1,
        feedback: 'El edificio fue construido a fines del siglo XVI como Cuartel Real de Lima (ya que Quito era parte del Virreinato del Perú), donde se congregaba la tropa colonial.'
    },
    {
        pregunta: '¿En qué año reabrió definitivamente el museo tras la restauración del FONSAL?',
        opciones: ['1987', '1992', '1997', '2002'],
        correcta: 3,
        feedback: 'El 27 de noviembre de 2002 el museo reabrió definitivamente tras una rehabilitación integral a cargo del FONSAL, sumando sus espacios al Centro Cultural Metropolitano.'
    }
];

let currentQ = 0;
let score    = 0;
let answered = false;

function initQuiz() {
    currentQ = 0;
    score    = 0;
    answered = false;
    renderQuestion();
    const resultado = document.getElementById('resultado');
    if (resultado) resultado.style.display = 'none';
    const qCard = document.getElementById('question-card');
    if (qCard) qCard.style.display = 'block';
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'none';
}

function renderQuestion() {
    const total = PREGUNTAS.length;
    const q = PREGUNTAS[currentQ];

    // Progress bar
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = (currentQ / total * 100) + '%';

    const progText = document.getElementById('progress-text');
    if (progText) progText.textContent = `Pregunta ${currentQ + 1} de ${total}`;

    const qNum = document.getElementById('q-number');
    if (qNum) qNum.textContent = `Pregunta ${currentQ + 1}`;

    const qTitle = document.getElementById('q-title');
    if (qTitle) qTitle.textContent = q.pregunta;

    // Rebuild options
    const optsContainer = document.getElementById('options-container');
    if (!optsContainer) return;
    optsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D', 'E'];
    q.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opcion}</span>`;
        btn.addEventListener('click', () => selectAnswer(i));
        optsContainer.appendChild(btn);
    });

    // Hide feedback & next
    const feedback = document.getElementById('q-feedback');
    if (feedback) { feedback.className = 'question-feedback'; feedback.textContent = ''; }

    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'none';

    // Re-animate card
    const card = document.getElementById('question-card');
    if (card) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
            card.style.animation = '';
            card.style.animationName = 'cardIn';
        });
    }

    answered = false;
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = PREGUNTAS[currentQ];
    const buttons = document.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === q.correcta;

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correcta) btn.classList.add('correct');
        else if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
    });

    if (isCorrect) score += 2;

    const feedback = document.getElementById('q-feedback');
    if (feedback) {
        feedback.textContent = (isCorrect ? '✓ ¡Correcto! ' : '✗ Incorrecto. ') + q.feedback;
        feedback.className = 'question-feedback ' + (isCorrect ? 'correct-fb' : 'wrong-fb');
    }

    const btnNext = document.getElementById('btn-next');
    if (btnNext) {
        btnNext.style.display = 'block';
        btnNext.textContent = currentQ < PREGUNTAS.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado';
    }
}

function nextQuestion() {
    currentQ++;
    if (currentQ < PREGUNTAS.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const qCard = document.getElementById('question-card');
    if (qCard) qCard.style.display = 'none';
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.style.display = 'none';
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = '100%';
    const progText = document.getElementById('progress-text');
    if (progText) progText.textContent = `Completado`;

    const maxScore = PREGUNTAS.length * 2;
    const pct = (score / maxScore) * 100;

    let mensaje, emoji;
    if (pct === 100)     { mensaje = 'Dominio total del tema histórico. ¡Impresionante!'; emoji = '🏆'; }
    else if (pct >= 75)  { mensaje = 'Excelente conocimiento de la historia del museo.'; emoji = '🥇'; }
    else if (pct >= 50)  { mensaje = 'Buen nivel. Sigue explorando la historia de Quito.'; emoji = '📚'; }
    else                 { mensaje = 'Visita el museo para descubrir más sobre su historia.'; emoji = '🏛️'; }

    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    resultado.style.display = 'block';

    document.getElementById('result-score').textContent = score;
    document.getElementById('result-max').textContent = maxScore;
    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-mensaje').textContent = mensaje;

    // Animate circle
    const circle = document.getElementById('result-circle');
    if (circle) {
        const circumference = 339.3;
        const offset = circumference - (pct / 100) * circumference;
        requestAnimationFrame(() => {
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 200);
        });
    }

    resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Expose to global scope
window.nextQuestion = nextQuestion;
window.initQuiz     = initQuiz;

// Auto-init quiz if page has quiz container
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('question-card')) {
        initQuiz();
    }
});