import { render, screen } from '@testing-library/react';
import Principal from '../pages/Principal';
import { getAsk } from '../services/requests';

test('loading', () => {
  render(<Principal />);
  const loadingElement = screen.getByText(/Carregando.../i);
  expect(loadingElement).toBeInTheDocument();
});

describe('api method getAsk()', () => {
  it('should load ask data', () => {
    return getAsk()
    .then(data => {
      expect(data).toBeDefined()
    })
  })
})