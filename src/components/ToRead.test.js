import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import ToRead, { ToReadView } from './ToRead';

const BOOKS = [
  {
    title: 'Prometheus Rising',
    author: 'Robert Anton Wilson',
    key: '/works/OL1805249W'
  },
  {
    title: 'Prometheus Rising',
    author: 'D. F. Wink',
    key: '/works/OL24231100W'
  },
  {
    title: 'Prometheus Rising',
    author: 'D. Wink',
    key: '/works/OL20900300W'
  },
  {
    title: 'Prometheus, or the rise of moral evil: a satire',
    author: 'Unknown author',
    key: '/works/OL18368290M'
  }
]

describe('testing the ToRead component', () => {

  it('shows the title', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/to read List/i)).toBeInTheDocument();
  });

  it('should show some instruction text and action button', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/nothing was added to the list yet./i)).toBeInTheDocument();
    expect(getByText(/try finding some interesting books./i)).toBeInTheDocument();

    expect(getByText(/find books/i)).toBeInTheDocument();
  });

  it('should go to the FindABook route when clicking in the action button', async () => {
    const { getByText, findByText } = render(
      <BrowserRouter>
        <ToRead />
        <Route path="/find">Find a Book</Route>
      </BrowserRouter>
    );

    fireEvent.click(getByText(/find books/i));

    const findABookTitle = await findByText(/find a book/i)
  
    expect(findABookTitle).toBeInTheDocument();
  });

  it('should render a list of books', async () => {
    const { getAllByRole } = render( <ToReadView books={BOOKS} /> );
    const itens = getAllByRole('listitem');

    expect(itens).toHaveLength(BOOKS.length);

    BOOKS.forEach( (book, index) => {
      expect(itens[index].textContent).toContain(book.title);
    });
  });

})
