import { setProgress } from "./graficos.js";

let intro = document.querySelector('.SplashScreen')
let logo = document.querySelector('.logo-header')
let logoSpan = document.querySelectorAll('.logo')
let logoImg = document.querySelector('.logo-img')
function Splash() {
    return new Promise((resolve) => {
        const intro = document.querySelector('.SplashScreen');
        const logoSpan = document.querySelectorAll('.logo');
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, (idx + 1) * 400); //tempo para cada Span ser ativado
            });
            setTimeout(() => {
                logoSpan.forEach((span, idx) => {
                    setTimeout(() => {
                        span.classList.remove('active');
                        span.classList.add('fade');
                    }, (idx + 1) * 50); // tempo entre cada Span
                });
            }, 2000); //tempo antes de iniciar a animação de subir a tela
            setTimeout(() => {
                intro.style.top = '-100vh';
                resolve();
            }, 2300); //tempo até tela comecar a subir
        });
    });
}

const SPLASH_SCREEN_KEY = 'showSplashScreen';
const TIMEOUT = 50000; // 10 minutos em milissegundos
const now = new Date().getTime();

function reiniciarTempo() {
    localStorage.setItem(SPLASH_SCREEN_KEY, new Date().getTime());
}

function updateCharts() {
    setProgress('Grafico1', 75);
    setProgress('Grafico2', 50);
    setProgress('Grafico3', 43);
    setProgress('Grafico4', 3);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function IrParaIndex() {
    window.location.href = '/index.html';
}

function inactivityTimeSplash() {
    const lastVisit = localStorage.getItem(SPLASH_SCREEN_KEY);
    const now = new Date().getTime();
    if (!lastVisit) {
        localStorage.setItem(SPLASH_SCREEN_KEY, now);
        return true;
    }

    const timeSinceLastVisit = now - parseInt(lastVisit, 10);

    if (timeSinceLastVisit > TIMEOUT) {
        localStorage.setItem(SPLASH_SCREEN_KEY, now);
        if (document.body.id === 'index-page') {
            Splash().then(() => {
                delay(500).then(() => {
                    updateCharts();
                });
            });
        }else{
            IrParaIndex();
        }
        return true;
    }

    return false;
}

export function SplashScreen() {
    if (!inactivityTimeSplash()) {
        if (document.body.id === 'index-page') {
            Splash().then(() => {
                delay(500).then(() => {
                    updateCharts();
                });
            });
        }
    }
}

window.onload = reiniciarTempo;
document.onmousemove = reiniciarTempo;
document.onkeydown = reiniciarTempo;

// Configura um intervalo para verificar a inatividade periodicamente
setInterval(() => {
    inactivityTimeSplash(); // Chama a função sem realizar outras ações
}, 1000); // Verifica a cada 500 milissegundos

