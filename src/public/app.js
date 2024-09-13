import { showSplashScreenIndex } from "./views/splash-screen-Index.js";
import { showSplashScreenTelaInicial } from "./views/splash-screen-Tela-Inicial.js";
import { Usuario } from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user,login } from "./controller/cadastro_user.js";
import { agenda } from "./views/agenda.js";

if (document.body.id === 'index-page') {
  document.addEventListener('DOMContentLoaded', () => {
    showSplashScreenIndex();
    let botao_entrar = document.getElementById("btn_entrar");
    if (botao_entrar) {
      botao_entrar.onclick = login;
    }
  });
}
else if (document.body.id === 'Initial-page') {
  document.addEventListener('DOMContentLoaded', showSplashScreenTelaInicial);
}
else if (document.body.id === 'agenda-page'){
  agenda();
}






window.logar = login;
window.cadastro_user = cadastro_user;