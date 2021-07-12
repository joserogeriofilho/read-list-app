import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'
import nock from 'nock';
import FindABook from './FindABook';


const OPEN_LIBRARY_MOCK_RESPONSE = {
  numFound: 4,
  num_found: 4,
  docs: [
    {
      title: 'Prometheus Rising',
      author_name: [ 'Robert Anton Wilson' ]
    },
    { title: 'Prometheus Rising', author_name: [ 'D. F. Wink' ] },
    { title: 'Prometheus Rising', author_name: [ 'D. Wink' ] },
    {
      title: 'Prometheus, or the rise of moral evil: a satire',
      author_name: undefined
    }
  ]
}

// Mock the server response for the search endpoint
nock('http://openlibrary.org')
  .persist()
  .get('/search.json?title=prometheus+rising')
  .reply(200, OPEN_LIBRARY_MOCK_RESPONSE);

const renderWithReduxProvider = () => render(
  <Provider store={store}>
    <FindABook />
  </Provider>
);


describe('testing the FindABook component', () => {

  let originalError;

  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders the title', () => {
    const { getByText } = renderWithReduxProvider();
    expect(getByText(/find a book/i)).toBeInTheDocument();
  });

  it('should have an input with placeholder', () => {
    const { getByPlaceholderText } = renderWithReduxProvider();
    expect(getByPlaceholderText(/enter a book's title/i)).toBeInTheDocument();
  });

  it('should render a list of books after filling the input search', async () => {  
    renderWithReduxProvider();

    fireEvent.change(
      screen.getByPlaceholderText(/enter a book's title/i), 
      {target: { value: 'prometheus rising' }}
    );
    
    const itens = await screen.findAllByRole('listitem');

    expect(itens).toHaveLength(OPEN_LIBRARY_MOCK_RESPONSE.docs.length);

    OPEN_LIBRARY_MOCK_RESPONSE.docs.forEach( (doc, index) => {
      expect(itens[index].textContent).toContain(doc.title);
    });
  });

})
