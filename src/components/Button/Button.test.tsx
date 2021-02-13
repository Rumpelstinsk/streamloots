import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

describe('Loading', () => {
  it('renders a button', () => {
    render(<Button mode="normal">Button</Button>);

    expect(screen.getByText('Button')).toBeVisible();
  });
});