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
        button.classList.add("deactivate");
        display.innerHTML = 'Конец';
        display.id = "finish";
        var data = {
            clicks: clicks,
        };
        display.addEventListener("click", () => {
            Telegram.WebApp.sendData(JSON.stringify(data));
        });

        clearInterval(interval);
        clearTimeout(timeFinish);
        Telegram.WebApp.HapticFeedback.notificationOccurred('error');  // вибрация
    }), TIMEOUT) 
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}

Telegram.WebApp.expand();
Telegram.WebApp.enableClosingConfirmation();  // вышел - не зассчитывается попытка