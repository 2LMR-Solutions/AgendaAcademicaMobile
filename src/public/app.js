// import { showSplashScreenIndex } from "./views/splash-screen-Index.js";
// import { showSplashScreenTelaInicial } from "./views/splash-screen-Tela-Inicial.js";
import { showSplashScreen } from "./views/splash-screen.js";
import { Usuario } from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";
import { agenda } from "./views/agenda.js";
import { inactivityTime } from "./views/DetectorDeInatividade.js";
 

if (document.body.id === 'index-page') {
  document.addEventListener('DOMContentLoaded', showSplashScreen);
}
else if (document.body.id === 'agenda-page'){
  agenda();
}

inactivityTime(); // tentar arrumar essa função 

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;