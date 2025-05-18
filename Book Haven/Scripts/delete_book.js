document.addEventListener('DOMContentLoaded', () => {
    // 1) Define static books
    const staticBooks = [
      { id:'1', title:'Book of Tea', author:'Kakuzo Okakura' },
      { id:'2', title:'The Herbwitch Princess', author:'Nina George' },
      { id:'3', title:'All Around The Moon', author:'Jules Verne' },
      { id:'4', title:'Time Travel', author:'H.G. Wells' }
    ];
  
    // 2) Bootstrap storage if empty
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(staticBooks));
    }
  
    // 3) Load all books
    let books = JSON.parse(localStorage.getItem('books'));
  
    const selectEl = document.getElementById('bookSelect');
    const form     = document.getElementById('delete-form');
  
    // 4) Populate the dropdown
    function populateOptions() {
      selectEl.innerHTML = '<option value="">-- Choose a Book --</option>'
        + books.map(b => 
            `<option value="${b.id}">
               ${b.title} — ${b.author}
             </option>`
          ).join('');
    }
    populateOptions();
  
    // 5) Handle deletion
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = selectEl.value;
      if (!id) return;
  
      const book = books.find(b => b.id === id);
      if (!book) {
        alert('Book not found.');
        return;
      }
  
      const confirmed = confirm(
        `Are you sure you want to delete "${book.title}" by ${book.author}?`
      );
      if (!confirmed) return;
  
      // remove from array & storage
      books = books.filter(b => b.id !== id);
      localStorage.setItem('books', JSON.stringify(books));
  
      // update UI
      populateOptions();
      alert('Book deleted successfully!');
    });
  });
  