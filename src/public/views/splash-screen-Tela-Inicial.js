// fazer import da função de fazer login na splash do index, trazer alguma coisa do 
// local storage dizendo que ja fez login ou não,
// usar isso para dizer se tem que aparecer a tela de login e a splash screen.
// fazer função para verificar se faz mais de 2 dias que não é acessado o site, se fizer mais de 2 dias
// tem que aparecer a splash e dai a tela de login, se não tem que ir direto para a tela inicial
// e dai vai aparecer a splash somente com o bem vindo e o nome do usuario.

// mudar a função de aparecer a splash do index para funcionar junto com o login, 
// se fizer mais de 2 dias que não acesso ao site
// tem que aparecer essa splash e dai a tela de login, ao contrario tem que ir direto para a tela inicial
// usar local storage para salvar a data do ultimo acesso, e com isso fazer a conta de dias do ultimo acesso

// fazer alguma função para verificar o nome do usuario e o sexo para colocar no Bem Vindo(a) 
// e o Usuario na splash screen da tela inicial e tambem no header
// tentar ver alguma coisa para mudar a função do tempo para mostrar a splash, tentar fazer alguma coisa 
// de tempo de inatividade, 10 minutos de inatividade, e não simplesmente 10 minutos

// tentar ver tambem função para gerar os graficos corretos com base nas tarefas que aparecem na tela inicial
// ver a quantidade de tarefas que tem na tabela da tela inicial (colocar no maximo 6 pra não ficar uma tela muito grande),
// e a partir dessa quantidade fazer a função gerar o grafico e o nome em baixo dele com base na tarefa, a função tem 
// que fazer o calculo com base nas subtarefas e ja mostrar nos graficos

// fazer tambem o link da função criarTarefa("Tarefa Silvio", 12, 9, 2024) que fica na agenda 
// na função master de criar tarefas da tela Incluir Tarefa, 
// fazer essa função master chamar a função para popular a agenda

// arrumar a tabela da tela inicial, mandar para tela de editar tarefa ao clicar na tarefa, nessa tela tem que ter 
// todas as subtarefas para ir marcando, tem tambem que ter algum lugar mostrando a porcentagem de conclusão das subtarefas
// nessa tabela da tela inicial tem que ter uma função que mostre as 6 tarefas que estão mais perto de chegarem 
// na data final ou na data de entrega, usar essa função de verificar a tarefa mais perto de vencer para fazer alguma notificação

// tentar ver como faz a API com o Laravel - php e fazer o banco sqlite para começar a testar guardar as coisas no banco 
// e no local storage dependendo do tipo do dado 

// tentar ver como que faz para acessar a camera para tirar foto de perfil, fazer alguma função 
// para chamar a camera e tirar a foto, ver como que faz para guardar essa foto no banco 

// ver quais imports realmente estão sendo usados nas paginas, alguns não são usados, colocar os que são usados no 
// service-worker.js para ficar em cache para quando ficar sem internet pelo menos a tela continuar funcionando


import { setProgress } from "./graficos.js";    
    
    let intro = document.querySelector('.SplashScreenTelaInicial')
    let logo = document.querySelector('.logo-header-Tela-Inicial')
    let logoSpan = document.querySelectorAll('.logoTelaInicial')
    let logoImg = document.querySelector('.logo-img-Tela-Inicial')
    function Splash() {
      return new Promise((resolve) => {
          const intro = document.querySelector('.SplashScreenTelaInicial');
          const logoSpan = document.querySelectorAll('.logoTelaInicial');
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

const SPLASH_SCREEN_KEY = 'showSplashScreenTelaInicial';
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

export function showSplashScreenTelaInicial() {
    if (shouldShowSplashScreen()) {
        Splash().then(() => {
            delay(500).then(() => {
                updateCharts();
            });
        });
    } else {
        document.querySelector('.SplashScreenTelaInicial').style.display = 'none';
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