document.addEventListener('DOMContentLoaded', () => {
    const params   = new URLSearchParams(location.search);
    const bookID   = params.get('bookID');
    const container= document.getElementById('details-container');
    const dynBooks = JSON.parse(localStorage.getItem('books') || '[]');
  
    // your four static entries; include real descriptions here
    const staticBooks = [
      {
        id: '1',
        title: 'Book of Tea',
        author: 'Kakuzo Okakura',
        imageData: '/images/book1.png',
        description: `“The Book of Tea” (1906) by Okakura blends Zen, Taoism
          and Japanese aesthetics to explore harmony, respect and purity.`
      },
      {
        id: '2',
        title: 'The Herbwitch Princess',
        author: 'Nina George',
        imageData: '/images/book2.png',
        description: `Lady Narcissa Greenwood has been haunted by her past since
        the disaster of last summer's Season. The society she once reveled in now
        sees her as the traitor's daughter. Narcissa fears she can never prove them wrong.`
      },
      {
        id:'3',
        title:'All Around The Moon',
        author: 'Jules Verne',
        imageData:'/images/book3.png',
        description:`follows the adventures of three travellers shot into space
        in a projectile. They face challenges, including a collision with an
        asteroid, as they journey towards the Moon. `
      },
      {
        id:'4',
        title:'Time Travel',
        author:'H.G. Wells',
        imageData: '/images/book4.png',
        description:` A pull of the Time Machine's lever propels him to the age of
        a slowly dying Earth.  There he discovers two bizarre races—the ethereal Eloi
        and the subterranean Morlocks—who not only symbolize the duality of human nature,
        but offer a terrifying portrait of the men of tomorrow as well. `
      }
    ];
  
    
    const allBooks = [...dynBooks, ...staticBooks];
    const book     = allBooks.find(b => b.id === bookID);
  
    if (!book) {
      container.innerHTML = '<p>Book not found.</p>';
      return;
    }
  
    container.innerHTML = `
      <div class="book-details">
        <img src="${book.imageData}"
             class="book-image"
             alt="Cover of ${book.title}">
        <div class="book-info">
          <h1 class="book-title">${book.title}</h1>
          <p class="book-author">By ${book.author}</p>
          <p class="book-status available">Status: Available</p>
          <button class="borrow-btn">Borrow Book</button>
        </div>
      </div>
      <div class="description">
        <h3>Description</h3>
        <p>${book.description}</p>
      </div>
    `;
  
  
  const btn = container.querySelector('.borrow-btn');
  btn.addEventListener('click', () => {
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    if (!borrowed.some(b => b.id === book.id)) {
      borrowed.push(book);
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
    }
    window.location.href = '/Pages/borrowed_books.html';
  });
});