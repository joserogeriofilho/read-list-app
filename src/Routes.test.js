import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import Routes from './Routes'

const renderWithReduxProvider = () => render(
  <Provider store={store}>
    <Routes />
  </Provider>
);


describe('testing the app routing', () => {
  beforeEach( () => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the ToRead page when no URL was defined', () => {  
    renderWithReduxProvider();
    expect(screen.getByText(/to read list/i)).toBeInTheDocument()
  });

  it('should render the FindABook page when accessing the "/find" URL', () => {  
    window.history.pushState({}, 'Test page', '/find');
    renderWithReduxProvider();
    expect(screen.getByText(/find a book/i)).toBeInTheDocument()
  });

  it('should render the Finished page when accessing the "/finished" URL', () => {  
    window.history.pushState({}, 'Test page', '/finished');
    renderWithReduxProvider();
    expect(screen.getByText(/finished/i)).toBeInTheDocument()
  });

})
