import { render, screen } from './test-utils';
import Routes from './Routes';


describe('testing the app routing', () => {
  beforeEach( () => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the ToRead page when no URL was defined', () => {  
    render(<Routes />);
    expect(screen.getByText(/to read list/i)).toBeInTheDocument()
  });

  it('should render the FindABook page when accessing the "/find" URL', () => {  
    window.history.pushState({}, 'Test page', '/find');
    render(<Routes />);
    expect(screen.getByText(/find a book/i)).toBeInTheDocument()
  });

  it('should render the Finished page when accessing the "/finished" URL', () => {  
    window.history.pushState({}, 'Test page', '/finished');
    render(<Routes />);
    expect(screen.getByText(/finished/i)).toBeInTheDocument()
  });

})
