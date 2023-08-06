let clicks = 1;

const TIMEOUT = 5000;

const display = document.querySelector("#display");
const button = document.querySelector("#button");
const counter = document.querySelector("#counter");

button.onclick = start;

function start() {
    const startTime = Date.now();
    display.innerHTML = formatTime(TIMEOUT);
    counter.innerHTML = clicks++;

    button.onclick = () => counter.innerHTML = clicks++;

    const interval = setInterval(() => {
        const delta = Date.now() - startTime;
        display.innerHTML = formatTime(TIMEOUT - delta);
    }, 100);

    const timeFinish = setTimeout((() => {
        button.onclick = null;
        display.innerHTML = 'Конец';
        button.classList.add("deactivate");
        display.id = "finish";

        clearInterval(interval);
        clearTimeout(timeFinish);
    }), TIMEOUT) 
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}