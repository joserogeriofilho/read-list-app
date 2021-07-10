import { search } from './openLibraryAPI';
import nock from 'nock';

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

const BOOKS_FROM_MOCK_RESPONSE = [
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


// Mock the server response for the search endpoint
nock('http://openlibrary.org')
  .persist()
  .get('/search.json?title=prometheus+rising')
  .reply(200, OPEN_LIBRARY_MOCK_RESPONSE);

describe('open library API', () => {
  
  it('should transform data from OpenLibrary API', async () => {
    const books = await search('prometheus rising');
    expect(books.length).toEqual(4);
    expect(books).toEqual(BOOKS_FROM_MOCK_RESPONSE);
  });

});
