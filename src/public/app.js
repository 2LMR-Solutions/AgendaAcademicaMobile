import { Splash } from "./views/splash-screen.js";
import { setProgress } from "./views/graficos.js";
import { Usuario} from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";

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

function showSplashScreen() {
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

document.addEventListener('DOMContentLoaded', showSplashScreen);

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;