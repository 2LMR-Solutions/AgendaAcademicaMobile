let intro = document.querySelector('.SplashScreenIndex')
let logo = document.querySelector('.logo-header-Index')
let logoSpan = document.querySelectorAll('.logoIndex')
let logoImg = document.querySelector('.logo-img-Index')
function Splash() {
    return new Promise((resolve) => {
        const intro = document.querySelector('.SplashScreenIndex');
        const logoSpan = document.querySelectorAll('.logoIndex');
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

const SPLASH_SCREEN_KEY = 'showSplashScreenIndex';
const TIMEOUT = 1000; 
// const TIMEOUT = 10 * 60 * 1000; //tempo para mostrar a splashscreen 10 minutos,
                                //a cada 10 minutos quando entrar no index, vai mostrar a splashscreen    

//função para ver se a splash screen vai ser mostrada
function shouldShowSplashScreen() {
    const lastVisit = localStorage.getItem(SPLASH_SCREEN_KEY);
    const now = new Date().getTime();

    if (!lastVisit) {
        localStorage.setItem(SPLASH_SCREEN_KEY, now);
        return true;
    }

    const timeSinceLastVisit = now - parseInt(lastVisit, 10);

    if (timeSinceLastVisit > TIMEOUT) {
        localStorage.setItem(SPLASH_SCREEN_KEY, now);
        return true;
    }

    return false;
}

export function showSplashScreenIndex() {
    if (shouldShowSplashScreen()) {
        Splash()
    } else {
        document.querySelector('.SplashScreenIndex').style.display = 'none';
    }
}
