document.addEventListener('DOMContentLoaded', () => {
    const listEl   = document.getElementById('borrowed-list');
    let borrowed   = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
  
    function render() {
      listEl.innerHTML = '';
      if (borrowed.length === 0) {
        listEl.innerHTML = '<p>You have not borrowed any books yet.</p>';
        return;
      }
  
      
      const today = new Date();
      const dueDateString = today.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
  
      borrowed.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
          <div class="book-image">
            <img src="${book.imageData}" alt="Cover of ${book.title}">
          </div>
          <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p class="book-status due">Due: ${dueDateString}</p>
          </div>
          <button class="return-btn">Return Book</button>
        `;
        listEl.appendChild(card);
  
        // Return handler
        card.querySelector('.return-btn').addEventListener('click', () => {
          // remove from array & storage
          borrowed = borrowed.filter(b => b.id !== book.id);
          localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
          // remove from DOM
          card.remove();
          // if empty now, re-render message
          if (borrowed.length === 0) render();
        });
      });
    }
  
    render();
  });
  