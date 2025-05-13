export function loadNotes() {
  console.log("Notes section is ready!");
  // components/notes.js
  const container = document.getElementById('notes');
  container.innerHTML = `
    <h2>🗒️ Notes</h2>
    <div class="notes-container">
      <textarea id="note-input" placeholder="Write something..."></textarea>
      <button id="save-note">Save Note</button>
      <input type="text" id="search-notes" placeholder="Search Notes..." />
      <div id="note-list"></div>
    </div>
  `;

  const input = document.getElementById('note-input');
  const saveBtn = document.getElementById('save-note');
  const searchInput = document.getElementById('search-notes');
  const noteList = document.getElementById('note-list');

  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  // Function to render notes
  const renderNotes = (filteredNotes) => {
    noteList.innerHTML = '';
    filteredNotes.forEach((note, index) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <div contenteditable="true" class="note-content">${note}</div>
        <button data-index="${index}" class="delete-note">🗑️</button>
      `;
      noteList.appendChild(noteDiv);
    });
  };

  // Save notes to localStorage
  const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  // Add new note
  saveBtn.addEventListener('click', () => {
    const noteText = input.value.trim();
    if (noteText) {
      notes.push(noteText);
      input.value = '';
      saveNotes();
      renderNotes(notes);
    }
  });

  // Handle note deletion
  noteList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete-note')) {
      if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes(notes);
      }
    }
  });

  // Search notes functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotes = notes.filter(note => note.toLowerCase().includes(searchTerm));
    renderNotes(filteredNotes);
  });

  // Render notes when the page loads
  renderNotes(notes);
}