import { render } from '@testing-library/react';
import ToRead from './ToRead';

describe('testing the ToRead component', () => {

  it('shows the title', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/to read List/i)).toBeInTheDocument();
  });

  it('shows some instruction text and a action button', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/nothing was added to the list yet./i)).toBeInTheDocument();
    expect(getByText(/try finding some interesting books./i)).toBeInTheDocument();

    expect(getByText(/find books/i)).toBeInTheDocument();
  });

})
