import { render } from '@testing-library/react';
import WatchList from './WatchList';

describe('testing the watch list component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <WatchList />
    );
  
    expect(getByText(/watch list/i)).toBeInTheDocument();
  });

})
