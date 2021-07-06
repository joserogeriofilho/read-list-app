import { render } from '@testing-library/react';
import FindAMovie from './FindAMovie';

describe('testing the FindAMovie component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <FindAMovie />
    );
  
    expect(getByText(/find a movie/i)).toBeInTheDocument();
  });

})
