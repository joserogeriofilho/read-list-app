import bookReducer, {
  addBook,
  markAsRead
} from './bookSlice';

const BOOK_1 = {
  title: 'Prometheus Rising',
  author: 'Robert Anton Wilson',
  key: '/works/OL1805249W'
}

const STATE_BOOK_1_UNREAD = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W',
    read: false
  }
];

const STATE_BOOK_1_READ = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W',
    read: true
  }
];


describe('counter books', () => {
  const initialState = {
    toRead: []
  };
  
  it('should handle initial state', () => {
    expect(bookReducer(undefined, { type: 'unknown' })).toEqual({
      toRead: []
    });
  });

  it('should handle initial state not empty', () => {
    expect(bookReducer({ toRead: [BOOK_1] }, { type: 'unknown' })).toEqual({
      toRead: [BOOK_1]
    });
  });

  it('should add a book to the read list', () => {
    const actual = bookReducer(initialState, addBook(BOOK_1));
    expect(actual.toRead).toEqual(STATE_BOOK_1_UNREAD);
  });

  it('should mark a book as read', () => {
    const actual = bookReducer({ toRead: [BOOK_1] }, markAsRead(BOOK_1.key));
    expect(actual.toRead).toEqual(STATE_BOOK_1_READ);
  });

});
