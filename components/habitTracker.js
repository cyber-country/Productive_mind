export function loadHabitTracker() {
  console.log("Habit Tracker is ready!");
  const container = document.getElementById('habit-tracker');
  container.innerHTML = `
    <h2>🎯 Habit Tracker</h2>
    <div class="habit-container">
      <input type="text" id="habit-input" placeholder="Enter a new habit" />
      <input type="text" id="habit-note-input" placeholder="Add a note (optional)" />
      <select id="habit-frequency">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="custom">Custom</option>
      </select>
      <button id="add-habit">Add Habit</button>
    </div>
    <div id="habit-list"></div>
    <div id="habit-stats">
      <p>Longest Streak: <span id="longest-streak">0</span> days</p>
      <p>Current Streak: <span id="current-streak">0</span> days</p>
      <p>Completion Rate: <span id="completion-rate">0%</span></p>
    </div>
  `;

  const input = document.getElementById('habit-input');
  const noteInput = document.getElementById('habit-note-input');
  const frequencySelect = document.getElementById('habit-frequency');
  const addBtn = document.getElementById('add-habit');
  const habitList = document.getElementById('habit-list');
  const longestStreakElem = document.getElementById('longest-streak');
  const currentStreakElem = document.getElementById('current-streak');
  const completionRateElem = document.getElementById('completion-rate');

  let habits = JSON.parse(localStorage.getItem('habits')) || [];

  const renderHabits = () => {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
      const habitDiv = document.createElement('div');
      habitDiv.classList.add('habit-item');
      habitDiv.innerHTML = `
        <span class="${habit.completed ? 'completed' : ''}">${habit.text}</span>
        <button data-index="${index}" class="complete-btn">✔</button>
        <button data-index="${index}" class="delete-btn">🗑️</button>
        <p class="habit-note">${habit.note || ''}</p>
      `;
      habitList.appendChild(habitDiv);
    });

    const completedCount = habits.filter(habit => habit.completed).length;
    const totalCount = habits.length;

    const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak || 0), 0);
    const currentStreak = habits.filter(habit => habit.completed).length;
    const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    longestStreakElem.textContent = longestStreak;
    currentStreakElem.textContent = currentStreak;
    completionRateElem.textContent = `${completionRate.toFixed(2)}%`;
  };

  const saveHabits = () => {
    localStorage.setItem('habits', JSON.stringify(habits));
  };

  addBtn.addEventListener('click', () => {
    const habitText = input.value.trim();
    const habitNote = noteInput.value.trim();
    const habitFrequency = frequencySelect.value;

    if (habitText) {
      habits.push({ text: habitText, completed: false, frequency: habitFrequency, note: habitNote, streak: 0 });
      input.value = '';
      noteInput.value = '';
      saveHabits();
      renderHabits();
    }
  });

  habitList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete-btn')) {
      habits.splice(index, 1);
    } else if (e.target.classList.contains('complete-btn')) {
      habits[index].completed = !habits[index].completed;
      habits[index].streak = habits[index].completed ? habits[index].streak + 1 : 0;
    }
    saveHabits();
    renderHabits();
  });

  renderHabits();
}
