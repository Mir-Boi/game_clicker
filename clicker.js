function nameToRgba(name) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = name;
    context.fillRect(0,0,1,1);
    return context.getImageData(0,0,1,1).data;
}

alert("Гей: " + Telegram.WebApp.button_color);
alert("Гей2" + nameToRgba(Telegram.WebApp.button_color));

var clicks = 0;

const TIMEOUT = 10000;

const display = document.querySelector("#display");
const button = document.querySelector("#button");
const counter = document.querySelector("#counter");
var sound_click = new Audio("click.mp3");

button.onclick = start;

function start() {
    const startTime = Date.now();
    counter.innerHTML = clicks;
    display.innerHTML = formatTime(TIMEOUT);
    document.querySelector("#button").innerHTML = "Клик";

    button.onclick = () => {
        counter.innerHTML = clicks++;
        sound_click.currentTime = 0;
        sound_click.play()
    };

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