import { render } from '@testing-library/react';
import ToRead from './ToRead';

describe('testing the ToRead component', () => {

  it('renders the title', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/to read List/i)).toBeInTheDocument();
  });

})
