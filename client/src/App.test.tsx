import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the GameList component', () => {
    render(<App />);
    const todoForm = screen.getByTestId("game-list");
    expect(todoForm).toBeInTheDocument();
  });
});
