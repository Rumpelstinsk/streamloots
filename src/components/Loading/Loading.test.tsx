import { render, screen } from '@testing-library/react';
import React from 'react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('shows a loading panel', () => {
    renderComponent();

    expect(screen.getByText(/Loading/)).toBeVisible();
  });

  it('displays a custom loading message', () => {
    const message = 'Custom message';

    renderComponent(message);

    expect(screen.getByText(message)).toBeVisible();
  });

  const renderComponent = (message?: string):void =>{
    render(<Loading message={message} />);
  };
});