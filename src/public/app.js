import { Splash, shouldShowSplashScreen, showSplashScreen, updateCharts, delay } from "./views/splash-screen.js";
import { setProgress } from "./views/graficos.js";
import { Usuario} from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";

document.addEventListener('DOMContentLoaded', showSplashScreen);

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;