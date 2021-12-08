import { render, screen } from '@testing-library/react';
import Principal from '../pages/Principal';

test('content form', () => {
  render(<Principal />);
  const linkElement = screen.getByText(/Stoodi/i);
  expect(linkElement).toBeInTheDocument();
});
