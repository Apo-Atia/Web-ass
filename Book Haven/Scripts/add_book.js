document.getElementById('add-book-form')
  .addEventListener('submit', handleAdd);

function handleAdd(e) {
  e.preventDefault();
  const errBox = document.getElementById('add-error');
  errBox.textContent = '';

  const id          = document.getElementById('bookID').value.trim();
  const title       = document.getElementById('title').value.trim();
  const author      = document.getElementById('author').value.trim();
  const category    = document.getElementById('category').value.trim();
  const description = document.getElementById('description').value.trim();
  const fileInput   = document.getElementById('image');
  const file        = fileInput.files[0];

  // validate
  if (!id || !title || !author || !category || !description) {
    return errBox.textContent = 'All fields are required.';
  }
  if (!file) {
    return errBox.textContent = 'You must select a cover image.';
  }
  if (!file.type.startsWith('image/')) {
    return errBox.textContent = 'File must be an image.';
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imageData = reader.result;  // base64

    const book = { id, title, author, category, description, imageData };
    const books = JSON.parse(localStorage.getItem('books') || '[]');

    if (books.some(b => b.id === id)) {
      return errBox.textContent = 'Book ID already exists.';
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = '/Pages/book_list.html';
  };
  reader.readAsDataURL(file);
}
