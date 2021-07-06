import { render, screen } from '@testing-library/react';
import Routes from './Routes'

describe('testing the app routing', () => {
  beforeEach( () => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the WatchList page when no URL was defined', () => {  
    render(<Routes />);
    expect(screen.getByText(/watch list/i)).toBeInTheDocument()
  });

  it('should render the FindAMovie page when accessing the "/find" URL', () => {  
    window.history.pushState({}, 'Test page', '/find');
    render(<Routes />);
    expect(screen.getByText(/find a movie/i)).toBeInTheDocument()
  });

  it('should render the Watched page when accessing the "/watched" URL', () => {  
    window.history.pushState({}, 'Test page', '/watched');
    render(<Routes />);
    expect(screen.getByText(/watched/i)).toBeInTheDocument()
  });

})
