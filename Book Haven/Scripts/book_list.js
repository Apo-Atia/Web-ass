document.addEventListener('DOMContentLoaded', () => {
  const grid  = document.getElementById('book-grid');
  const books = JSON.parse(localStorage.getItem('books') || '[]');

  books.forEach(b => {
    const div = document.createElement('div');
    div.className = 'book-item';

    div.innerHTML = `
      <img src="${b.imageData}" alt="${b.title}">
      <h3>${b.title}</h3>
      <p>Author: ${b.author}</p>
      <a href="book_details.html?bookID=${encodeURIComponent(b.id)}"
         class="details-btn">Book Details</a>
    `;

    grid.appendChild(div);
  });
});
