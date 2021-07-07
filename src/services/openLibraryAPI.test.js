import { search } from './openLibraryAPI';
import nock from 'nock';

const OPEN_LIBRARY_MOCK_RESPONSE = {
  "numFound": 4,
  "num_found": 4,
  "docs": [
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

describe('open library API', () => {
  
  it('should return a promise', async () => {
    const books = await search('prometheus rising');
    expect(books.length).toBeGreaterThan(0);
  });

});
