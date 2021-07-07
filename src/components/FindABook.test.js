import { render } from '@testing-library/react';
import FindABook from './FindABook';

describe('testing the FindABook component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <FindABook />
    );
  
    expect(getByText(/find a book/i)).toBeInTheDocument();
  });

})
