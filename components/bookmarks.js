export function loadBookmarks() {
  console.log("Bookmarks functionality is ready!");
  // components/bookmarks.js
  const container = document.getElementById('bookmarks');
  container.innerHTML = `
    <h2>🔖 Bookmarks</h2>
    <div class="bookmark-form">
      <input type="text" id="bookmark-title" placeholder="Title" />
      <input type="url" id="bookmark-url" placeholder="https://example.com" />
      <button id="add-bookmark">Add</button>
    </div>
    <ul id="bookmark-list"></ul>
  `;

  const titleInput = document.getElementById('bookmark-title');
  const urlInput = document.getElementById('bookmark-url');
  const addBtn = document.getElementById('add-bookmark');
  const list = document.getElementById('bookmark-list');

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  const renderBookmarks = () => {
    list.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
        <button data-index="${index}" class="delete-bookmark">✖</button>
      `;
      list.appendChild(li);
    });
  };

  const saveBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    if (title && url) {
      bookmarks.push({ title, url });
      titleInput.value = '';
      urlInput.value = '';
      saveBookmarks();
      renderBookmarks();
    }
  });

  list.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete-bookmark')) {
      bookmarks.splice(index, 1);
      saveBookmarks();
      renderBookmarks();
    }
  });

  renderBookmarks();
}


