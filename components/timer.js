export function loadTimer() {
  console.log("Timer functionality is ready!");
  
  // Get the container for timer display and buttons
  const container = document.getElementById('timer');
  container.innerHTML = `
    <h2>⏰ Timer</h2>
    <div class="timer-container">
      <div id="time-display">00:00</div>
      <input type="number" id="timer-input" placeholder="Set time (seconds)" />
      <button id="start-timer">Start</button>
      <button id="pause-timer" disabled>Pause</button>
      <button id="reset-timer" disabled>Reset</button>
    </div>
  `;

  const timeDisplay = document.getElementById('time-display');
  const timerInput = document.getElementById('timer-input');
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer');
  const resetBtn = document.getElementById('reset-timer');

  let countdown;
  let secondsRemaining = 0;
  let isRunning = false;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startTimer = () => {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    countdown = setInterval(() => {
      if (secondsRemaining <= 0) {
        clearInterval(countdown);
        alert("Time's up!");
        resetTimer();
      } else {
        secondsRemaining--;
        timeDisplay.textContent = formatTime(secondsRemaining);
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(countdown);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  };

  const resetTimer = () => {
    clearInterval(countdown);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    timeDisplay.textContent = "00:00";
    timerInput.value = '';
  };

  startBtn.addEventListener('click', () => {
    const time = parseInt(timerInput.value, 10);
    if (!isNaN(time) && time > 0) {
      secondsRemaining = time;
      timeDisplay.textContent = formatTime(secondsRemaining);
      startTimer();
    } else {
      alert("Please enter a valid time.");
    }
  });

  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
}
