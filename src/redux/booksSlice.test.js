import bookReducer, {
  addBook,
  markAsRead
} from './booksSlice';

const BOOK_1 = {
  title: 'Prometheus Rising',
  author: 'Robert Anton Wilson'
}

const STATE_BOOK_1_UNREAD = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    read: false
  }
];

const STATE_BOOK_1_READ = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    read: true
  }
];


describe('counter books', () => {
  const initialState = {
    books: []
  };
  
  it('should handle initial state', () => {
    expect(bookReducer(undefined, { type: 'unknown' })).toEqual({
      books: []
    });
  });

  it('should add a book to the read list', () => {
    const actual = bookReducer(initialState, addBook(BOOK_1));
    expect(actual.books).toEqual(STATE_BOOK_1_UNREAD);
  });

  it('should mark a book as read', () => {
    const actual = bookReducer([BOOK_1], markAsRead(BOOK_1.title, BOOK_1.author));
    expect(actual.books).toEqual(STATE_BOOK_1_READ);
  });

});
