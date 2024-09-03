    let intro = document.querySelector('.SplashScreen')
    let logo = document.querySelector('.logo-header')
    let logoSpan = document.querySelectorAll('.logo')
    let logoImg = document.querySelector('.logo-img')
    export function Splash() {
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