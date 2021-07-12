import { render, screen } from '@testing-library/react';
import Finished from './Finished';

describe('testing the Finished component', () => {

  it('renders the title', () => {
    render( <Finished /> );
    expect(screen.getByText(/finished books/i)).toBeInTheDocument();
  });

})
