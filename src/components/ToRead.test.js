import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
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

function renderWithReduxProvider() {
  return render(
    <Provider store={store}>
      <ToRead />
    </Provider>
  )
}

function renderWithReduxProviderAndRoutes() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ToRead />
        <Route path="/find">Find a Book</Route>
      </BrowserRouter>
    </Provider>
  )
}

describe('testing the ToRead component', () => {

  it('shows the title', () => {
    renderWithReduxProvider();
    expect(screen.getByText(/to read List/i)).toBeInTheDocument();
  });

  it('should show some instruction text and action button', () => {
    renderWithReduxProvider();
  
    expect(screen.getByText(/nothing was added to the list yet./i)).toBeInTheDocument();
    expect(screen.getByText(/try finding some interesting books./i)).toBeInTheDocument();
    expect(screen.getByText(/find books/i)).toBeInTheDocument();
  });

  it('should go to the FindABook route when clicking in the action button', async () => {
    renderWithReduxProviderAndRoutes();

    fireEvent.click(screen.getByText(/find books/i));
  
    expect(await screen.findByText(/find a book/i)).toBeInTheDocument();
  });

  it('should render a list of books', async () => {
    render( <ToReadView books={BOOKS} /> );
    const itens = screen.getAllByRole('listitem');

    expect(itens).toHaveLength(BOOKS.length);

    BOOKS.forEach( (book, index) => {
      expect(itens[index].textContent).toContain(book.title);
    });
  });

})
