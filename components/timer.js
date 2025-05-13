export function loadTimer() {
  console.log("Timer functionality is ready!");

  const container = document.getElementById('timer');
  container.innerHTML = `
    <h2>⏰ Timer</h2>
    <div class="timer-container">
      <svg class="progress-ring" width="150" height="150">
        <circle class="progress-ring__circle"
                stroke="green"
                stroke-width="10"
                fill="transparent"
                r="65"
                cx="75"
                cy="75" />
      </svg>
      <div class="time-display" id="time-display">00:00</div>
    </div>
    <div class="timer-controls">
      <input type="number" id="timer-input" placeholder="Seconds" min="1" />
      <button id="start-timer">Start</button>
      <button id="pause-timer" disabled>Pause</button>
      <button id="reset-timer" disabled>Reset</button>
    </div>
  `;

  const circle = container.querySelector('.progress-ring__circle');
  const timeDisplay = document.getElementById('time-display');
  const timerInput = document.getElementById('timer-input');
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer');
  const resetBtn = document.getElementById('reset-timer');
  const beep = new Audio('beep.mp3');

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = '0'; // Initially full circle shown

  let countdown;
  let secondsRemaining = 0;
  let totalSeconds = 0;
  let isRunning = false;

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const setProgress = (percent) => {
    const offset = circumference * (1 - percent);
    circle.style.strokeDashoffset = offset;
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
        beep.play();
        alert("Time's up!");
        resetTimer();
      } else {
        secondsRemaining--;
        timeDisplay.textContent = formatTime(secondsRemaining);
        setProgress(secondsRemaining / totalSeconds);
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
    secondsRemaining = 0;
    timeDisplay.textContent = "00:00";
    setProgress(0); // Reset progress circle
    timerInput.value = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  };

  startBtn.addEventListener('click', () => {
    const input = parseInt(timerInput.value, 10);
    if (!isNaN(input) && input > 0) {
      totalSeconds = input;
      secondsRemaining = input;
      timeDisplay.textContent = formatTime(secondsRemaining);
      setProgress(1); // Full circle
      startTimer();
    } else {
      alert("Please enter a valid number of seconds.");
    }
  });

  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
}
