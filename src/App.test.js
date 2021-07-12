import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
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

const renderWithReduxProvider = () => render(
  <Provider store={store}>
    <App />
  </Provider>
);


describe('testing the App component', () => {

  let originalError;

  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should add some itens in the to read list', () => {
    renderWithReduxProvider();
    expect(screen.getByText(/to read list/i)).toBeInTheDocument();
  });

});
