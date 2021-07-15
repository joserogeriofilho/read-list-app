import { render, screen } from '../test-utils';
import Finished from './Finished';


const ALL_BOOKS_UNFINISHED = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W',
  },
  {
    title: 'Prometheus Rising',
    author: 'D. F. Wink',
    key: '/works/OL24231100W',
    read: false
  },
  {
    title: 'Prometheus Rising',
    author: 'D. Wink',
    key: '/works/OL20900300W'
  },
  {
    title: 'Prometheus, or the rise of moral evil: a satire',
    author: 'Unknown author',
    key: '/works/OL18368290M',
    read: false
  }
]

const SOME_BOOKS_FINISHED = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W',
    read: true
  },
  {
    title: 'Prometheus Rising',
    author: 'D. F. Wink',
    key: '/works/OL24231100W',
    read: false
  },
  {
    title: 'Prometheus Rising',
    author: 'D. Wink',
    key: '/works/OL20900300W'
  },
  {
    title: 'Prometheus, or the rise of moral evil: a satire',
    author: 'Unknown author',
    key: '/works/OL18368290M',
    read: true
  }
]


describe('testing the Finished component', () => {

  it('renders the title', () => {
    render( <Finished /> );
    expect(screen.getByText(/finished books/i)).toBeInTheDocument();
  });

  it('should show no books', () => {
    render( <Finished />, { preloadedState: { books: { toRead: ALL_BOOKS_UNFINISHED } } });
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should show two books', () => {
    render( <Finished />, { preloadedState: { books: { toRead: SOME_BOOKS_FINISHED } } });
    expect(screen.queryAllByRole('listitem')).toHaveLength(2);
  });

})
