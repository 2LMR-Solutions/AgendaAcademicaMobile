export function setProgress(chartId, percent) {
    const chart = document.getElementById(chartId);
    if (!chart) {
        // console.error(`Gráfico com ID "${chartId}" não encontrado!`);
        return;
    }

    const circle = chart.querySelector('circle.circle');
    if (!circle) {
        console.error(`Elemento "circle" não encontrado no gráfico com ID "${chartId}"!`);
        return;
    }

    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    chart.querySelector('.percent').textContent = `${percent}%`;
}