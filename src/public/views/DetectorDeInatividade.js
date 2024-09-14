import { showSplashScreenTelaInicial } from "./splash-screen-Tela-Inicial.js";

export function inactivityTime() {
    let time;

    window.onload = reiniciarTempo;
    document.onmousemove = reiniciarTempo;
    document.onkeydown = reiniciarTempo;

    function SplashScreenTelaInicial() {
        console.log("teste 10 min")
        if (document.body.id === 'Initial-page') {
            document.addEventListener('DOMContentLoaded', showSplashScreenTelaInicial);
          }
    }

    function SplashScreenIndex() {
        console.log("teste 2 dias")
    }

    function reiniciarTempo() {
        clearTimeout(time);
        time = setTimeout(SplashScreenTelaInicial, 1000)
        time = setTimeout(SplashScreenIndex, 5000)
    }

}
