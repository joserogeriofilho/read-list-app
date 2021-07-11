import { render, fireEvent } from '@testing-library/react';
import ToRead from './ToRead';
import App from '../App';

describe('testing the ToRead component', () => {

  it('shows the title', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/to read List/i)).toBeInTheDocument();
  });

  it('should show some instruction text and action button', () => {
    const { getByText } = render(
      <ToRead />
    );
  
    expect(getByText(/nothing was added to the list yet./i)).toBeInTheDocument();
    expect(getByText(/try finding some interesting books./i)).toBeInTheDocument();

    expect(getByText(/find books/i)).toBeInTheDocument();
  });

  it('should go to the FindABook route when clicking in the action button', async () => {
    const component = render( <App /> );
    const button = component.getByText(/find books/i);

    fireEvent.click(button);

    const findABookTitle = await component.findByText(/find a book/i)
  
    expect(findABookTitle).toBeInTheDocument();
  });

})
