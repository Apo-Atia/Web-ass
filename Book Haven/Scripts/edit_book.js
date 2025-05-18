document.addEventListener('DOMContentLoaded', () => {
    // 1) Define your four static books
    const staticBooks = [
      {
        id: '1',
        title: 'Book of Tea',
        author: 'Kakuzo Okakura',
        category: 'Philosophy',
        description: `“The Book of Tea” (1906) by Okakura blends Zen, Taoism and Japanese aesthetics to explore harmony, respect and purity.`
      },
      {
        id: '2',
        title: 'The Herbwitch Princess',
        author: 'Nina George',
        category: 'Fantasy',
        description: `A magical tale of love, loss, and herbs.`
      },
      {
        id: '3',
        title: 'All Around The Moon',
        author: 'Jules Verne',
        category: 'Science Fiction',
        description: `Sequel to “From the Earth to the Moon,” following a lunar voyage.`
      },
      {
        id: '4',
        title: 'Time Travel',
        author: 'H.G. Wells',
        category: 'Science Fiction',
        description: `A classic exploration of temporal journeys.`
      }
    ];
  
    // 2) Initialize localStorage.books if it doesn't exist
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(staticBooks));
    }
  
    // 3) Load the books array
    let books = JSON.parse(localStorage.getItem('books'));
  
    // 4) Grab DOM elements
    const selectEl    = document.getElementById('bookSelect');
    const form        = document.querySelector('.edit-form');
    const idInput     = document.getElementById('bookID');
    const nameInput   = document.getElementById('bookName');
    const authorInput = document.getElementById('author');
    const catInput    = document.getElementById('category');
    const descInput   = document.getElementById('description');
  
    // 5) Populate the dropdown
    selectEl.innerHTML = books
      .map(b => `<option value="${b.id}">${b.title} — ${b.author}</option>`)
      .join('');
  
    // 6) Fill the form with a book’s data
    function fillForm(book) {
      idInput.value       = book.id;
      nameInput.value     = book.title;
      authorInput.value   = book.author;
      catInput.value      = book.category;
      descInput.value     = book.description;
    }
    fillForm(books[0]);
  
    selectEl.addEventListener('change', () => {
      const book = books.find(b => b.id === selectEl.value);
      if (book) fillForm(book);
    });
  
    // 7) Handle Save Changes: **update**, don’t push**
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const id    = idInput.value;
      const title = nameInput.value.trim();
      const auth  = authorInput.value.trim();
      const cat   = catInput.value.trim();
      const desc  = descInput.value.trim();
  
      if (!title || !auth || !cat || !desc) {
        alert('All fields are required.');
        return;
      }
  
      // find and overwrite the existing book object
      const idx = books.findIndex(b => b.id === id);
      if (idx === -1) {
        alert('Error: book not found.');
        return;
      }
  
      books[idx] = {
        ...books[idx],  // preserve imageData or other fields
        title,
        author: auth,
        category: cat,
        description: desc
      };
  
      // save the updated array back to localStorage
      localStorage.setItem('books', JSON.stringify(books));
      alert('Book details updated successfully!');
    });
  });
  