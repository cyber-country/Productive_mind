import { loadTodo } from './components/todo.js';
import { loadNotes } from './components/notes.js';
import { loadBookmarks } from './components/bookmarks.js';
import { loadTimer } from './components/timer.js';
import { loadHabitTracker } from './components/habitTracker.js';

loadTodo();
loadNotes();
loadBookmarks();
loadTimer();
loadHabitTracker();
// Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save theme preference
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
