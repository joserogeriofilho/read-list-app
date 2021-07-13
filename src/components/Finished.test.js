import { render, screen } from '../test-utils';
import Finished from './Finished';

describe('testing the Finished component', () => {

  it('renders the title', () => {
    render( <Finished /> );
    expect(screen.getByText(/finished books/i)).toBeInTheDocument();
  });

})
