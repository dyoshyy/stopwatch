class Stopwatch {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.startTime = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.elapsedTime = 0;
        this.createStopwatch();
    }

    createStopwatch() {
        const container = document.getElementById("stopwatches");
        const stopwatchDiv = document.createElement("div");
        stopwatchDiv.classList.add("stopwatch-container");
        stopwatchDiv.innerHTML = `
        <div class="stopwatch" id="stopwatch-${this.id}">${this.username}: 00:00:00.0</div>
        <button class="startStop" onclick="stopwatches[${this.id}].startStop()">Start</button>
        <button onclick="stopwatches[${this.id}].reset()">Reset</button>
    `;    
        container.appendChild(stopwatchDiv);
    }

    startStop() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            document.querySelector(`#${this.id} .startStop`).textContent = "Start";
        } else {
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(this.updateTime.bind(this), 100);
            document.querySelector(`#${this.id} .startStop`).textContent = "Stop";
        }
        this.isRunning = !this.isRunning;
    }

    reset() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.elapsedTime = 0;
        this.updateDisplay(0);
        document.querySelector(`#${this.id} .startStop`).textContent = "Start";
    }

    updateTime() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        this.updateDisplay(this.elapsedTime);
    }

    updateDisplay(time) {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const tenths = Math.floor((time % 1000) / 100);
    
        const stopwatchDiv = document.querySelector(`#stopwatch-${this.id}`);
        stopwatchDiv.textContent = `${this.username}: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
    }
    
}

const stopwatches = [];

function createStopwatch() {
    const username = document.getElementById("username").value || "ユーザー";
    const id = stopwatches.length;
    const stopwatch = new Stopwatch(id, username);
    stopwatches.push(stopwatch);
}
