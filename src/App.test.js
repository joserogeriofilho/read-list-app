import { render, fireEvent, screen } from './test-utils';
import nock from 'nock';
import App from './App';

const OPEN_LIBRARY_MOCK_RESPONSE = {
  numFound: 4,
  num_found: 4,
  docs: [
    {
      title: 'Prometheus Rising',
      author_name: [ 'Robert Anton Wilson' ],
      key: '/works/OL1805249W'
    },
    {
      title: 'Prometheus Rising',
      author_name: [ 'D. F. Wink' ],
      key: '/works/OL24231100W'
    },
    {
      title: 'Prometheus Rising',
      author_name: [ 'D. Wink' ],
      key: '/works/OL20900300W'
    },
    {
      title: 'Prometheus, or the rise of moral evil: a satire',
      author_name: undefined,
      key: '/works/OL18368290M'
    }
  ]
}

// Mock the server response for the search endpoint
nock('http://openlibrary.org')
  .persist()
  .get('/search.json?title=prometheus+rising')
  .reply(200, OPEN_LIBRARY_MOCK_RESPONSE);


describe('testing the App component', () => {

  let originalError;

  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should add some itens in the to read list', async () => {    
    render(<App />);
    expect(screen.getByText(/to read list/i)).toBeInTheDocument();

    // click on the button 'find' and go to the 'find a book' page
    fireEvent.click(screen.getByText(/find books/i));
    expect(await screen.findByText(/find a book/i)).toBeInTheDocument();

    // enter a book's title
    fireEvent.change(
      screen.getByPlaceholderText(/enter a book's title/i), 
      {target: { value: 'prometheus rising' }}
    );

    const itensOnFindPage = await screen.findAllByRole('listitem');

    expect(itensOnFindPage).toHaveLength(OPEN_LIBRARY_MOCK_RESPONSE.docs.length);

    // click on two options
    fireEvent.click(itensOnFindPage[0]);
    fireEvent.click(itensOnFindPage[1]);

    // go back to the 'to read' page
    window.history.back();
    expect(await screen.findByText(/to read list/i)).toBeInTheDocument();

    const itensToReadPage = await screen.findAllByRole('listitem');
    expect(itensToReadPage).toHaveLength(2);
    expect(itensToReadPage[0].textContent).toContain('Robert Anton Wilson');
    expect(itensToReadPage[1].textContent).toContain('D. F. Wink');
  });

});
