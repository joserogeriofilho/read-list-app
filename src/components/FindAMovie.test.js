import { render } from '@testing-library/react';
import FindAMovie from './FindAMovie';

describe('testing the find a movie component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <FindAMovie />
    );
  
    expect(getByText(/find a movie/i)).toBeInTheDocument();
  });

})
