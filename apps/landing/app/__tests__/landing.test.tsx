import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Hero from '../(components)/Hero';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('Landing', () => {
  it('should render Hero', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('eShaman')).toBeDefined();
  });

  it('should submit the waitlist form', async () => {
    const { getByPlaceholderText, getByText } = render(<Hero />);

    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Join');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', source: 'landing' }),
      });
    });

    await waitFor(() => {
      expect(getByText("Welcome to the journey. You'll hear from us soon.")).toBeDefined();
    });
  });
});
