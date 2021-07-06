import { search } from './openLibraryAPI'

describe('open library API', () => {
  
  it('should return a promise', async () => {
    const data = await search('lord of the rings');
    expect(data.docs.length).toBeGreaterThan(0);
  });

});
