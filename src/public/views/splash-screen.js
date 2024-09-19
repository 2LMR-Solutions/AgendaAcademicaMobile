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

export function SplashScreen() {
    const lastVisit = localStorage.getItem(SPLASH_SCREEN_KEY);
    const now = new Date().getTime();
    const timeSinceLastVisit = now - parseInt(lastVisit, 10);


        if (timeSinceLastVisit > TIMEOUT){
            Splash().then(() => {
                delay(500).then(() => {
                    updateCharts(); 
                });
            });
        }
        else {
            document.querySelector('.SplashScreen').style.display = 'none';
            updateCharts();
        }

}

const SPLASH_SCREEN_KEY = 'showSplashScreen';
const TIMEOUT =  10 * 60 * 1000; // 10 minutos
// const TIMEOUT =  5000; // para teste 5 segundos 

function reiniciarTempo() {
    localStorage.setItem(SPLASH_SCREEN_KEY, new Date().getTime());
}

export function inactivityTime() {
    const lastVisit = localStorage.getItem(SPLASH_SCREEN_KEY);
    const now = new Date().getTime();
    const timeSinceLastVisit = now - parseInt(lastVisit, 10);

    if (timeSinceLastVisit > TIMEOUT) {
        IrParaIndex();
    }
}

function IrParaIndex() {
    window.location.href = '/index.html';
}

function updateCharts() {
    // setProgress('Grafico1', 75);
    // setProgress('Grafico2', 50);
    // setProgress('Grafico3', 43);
    // setProgress('Grafico4', 3);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(() => {
    inactivityTime(); 
}, 1000); 

window.onload = reiniciarTempo;
document.onmousemove = reiniciarTempo;
document.onkeydown = reiniciarTempo;