import { Splash } from "./views/splash-screen.js";
import { setProgress } from "./views/graficos.js";
import { Usuario} from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";

 function updateCharts() {
  setProgress('Grafico1', 75); //para mudar as porcentagens dos graficos tem que mandar o ID do grafico e a porcentagem 
  setProgress('Grafico2', 50); //isso esta aqui para que quando terminar a animação da Splash Screen passar pelo Delay e 
  setProgress('Grafico3', 43); //dai vai fazer as animaçoes do grafico
  setProgress('Grafico4', 3);
}    

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Splash().then(() => {
    delay(500).then(() => { //tempo do delay, ele chama a função da splash e então depois do delay ele chama a função dos graficos
        updateCharts();
    });
});

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;