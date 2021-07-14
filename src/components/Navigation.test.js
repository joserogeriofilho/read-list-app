import { fireEvent, render, screen } from '../test-utils';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './Navigation';

function renderWithRoutes() {
  return render(
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact>To Read List</Route>
      <Route path="/find">Find a Book</Route>
      <Route path="/finished">Finished Books</Route>
    </BrowserRouter>
  )
}

describe('testing the Navigation component', () => {
  
  it('shows three links', () => {
    renderWithRoutes();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/find/i)).toBeInTheDocument();
    expect(screen.getByText(/finished/i)).toBeInTheDocument();
  });

  it('go to to read list page', async () => {
    renderWithRoutes();
    
    // go to find a book page
    fireEvent.click(screen.getByText(/find/i));
    expect(await screen.getByText(/find a book/i)).toBeInTheDocument();

    // go to finished books page
    fireEvent.click(screen.getByText(/finished/i));
    expect(await screen.getByText(/finished books/i)).toBeInTheDocument();

    // go to main page
    fireEvent.click(screen.getByText(/home/i));
    expect(await screen.findByText(/to read list/i)).toBeInTheDocument();
  });

});