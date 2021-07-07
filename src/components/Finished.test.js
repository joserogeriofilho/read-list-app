import { render } from '@testing-library/react';
import Finished from './Finished';

describe('testing the Finished component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <Finished />
    );
  
    expect(getByText(/finished books/i)).toBeInTheDocument();
  });

})
