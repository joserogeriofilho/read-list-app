import { render, fireEvent } from '../test-utils';
import Navigation from './Navigation';

function renderWithRoutes() {
  return render(
    <Provider store={store}>
      <Navigation />
      <BrowserRouter>
        <Route path="/" exact>To Read List</Route>
        <Route path="/find">Find a Book</Route>
        <Route path="/finished">Finished Books</Route>
      </BrowserRouter>
    </Provider>
  )
}

describe('testing the Navigation component', () => {
  
  it('shows three links', () => {
    render(<Navigation />)
    expect(screen.getByText(/your list/i)).toBeInTheDocument();
    expect(screen.getByText(/find/i)).toBeInTheDocument();
    expect(screen.getByText(/finished/i)).toBeInTheDocument();
  });

  it('go to to read list page', async () => {
    renderWithRoutes();
    
    // go to find a book page
    fireEvent.click(screen.getByText(/find/i));
    expect(await screen.getByText(/find a book/i)).toBeInTheDocument();

    // go to finished books page
    fireEvent.click(screen.getByText(/your list/i));
    expect(await screen.getByText(/finished books/i)).toBeInTheDocument();

    // go to main page
    fireEvent.click(screen.getByText(/your list/i));
    expect(await screen.findByText(/to read list/i)).toBeInTheDocument();
  });

});