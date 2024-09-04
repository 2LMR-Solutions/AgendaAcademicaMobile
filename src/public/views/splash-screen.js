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
const TIMEOUT = 10 * 60 * 1000; //tempo para mostrar a splashscreen 10 minutos,
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

export function showSplashScreen() {
    if (shouldShowSplashScreen()) {
        Splash().then(() => {
            delay(500).then(() => {
                updateCharts();
            });
        });
    } else {
        document.querySelector('.SplashScreen').style.display = 'none';
        updateCharts();
    }
}

function updateCharts() {
  setProgress('Grafico1', 75); //para mudar as porcentagens dos graficos tem que mandar o ID do grafico e a porcentagem 
  setProgress('Grafico2', 50); //isso esta aqui para que quando terminar a animação da Splash Screen passar pelo Delay e 
  setProgress('Grafico3', 43); //dai vai fazer as animaçoes do grafico
  setProgress('Grafico4', 3);
}    

 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}