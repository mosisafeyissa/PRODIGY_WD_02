let startStopBtn = document.getElementById("startStopBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let timeDisplay = document.getElementById("timeDisplay");
let lapsContainer = document.getElementById("laps");

let timer;
let isRunning = false;
let startTime = 0; 
let elapsedTime = 0; 
let lapTimes = [];
let lastTimestamp = 0; 

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let microseconds = Math.floor(ms % 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}:${String(microseconds).padStart(
    3,
    "0"
  )}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    startStopBtn.textContent = "Stop";
    isRunning = true;
    startTime = performance.now() - elapsedTime; 
    lastTimestamp = performance.now();
    timer = requestAnimationFrame(updateTimer);
  } else {
    startStopBtn.textContent = "Start";
    isRunning = false;
    cancelAnimationFrame(timer);
  }
}

function updateTimer() {
  if (isRunning) {
    let currentTimestamp = performance.now();
    let deltaTime = currentTimestamp - lastTimestamp; 
    lastTimestamp = currentTimestamp;

    elapsedTime += deltaTime;
    updateDisplay();

    timer = requestAnimationFrame(updateTimer); 
  }
}

function resetStopwatch() {
  cancelAnimationFrame(timer);
  isRunning = false;
  elapsedTime = 0;
  lapTimes = [];
  updateDisplay();
  lapsContainer.innerHTML = "";
  startStopBtn.textContent = "Start";
}

function recordLap() {
  if (isRunning) {
    lapTimes.push(elapsedTime);
    let lapItem = document.createElement("div");
    lapItem.classList.add("lap");
    lapItem.innerHTML = `Lap ${lapTimes.length}: <span>${formatTime(
      elapsedTime
    )}</span>`;
    lapsContainer.appendChild(lapItem);
  }
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
