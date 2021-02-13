import { render, screen } from '@testing-library/react';
import React from 'react';
import cardsFrom from '../../tests/helpers/cards-from';
import CardTable from './CardTable';

describe('Table', () => {
  it('shows card table', () => {
    const cards = cardsFrom(5);

    renderComponent({ cards });

    expect(screen.getByText(/Card name/)).toBeVisible();
    expect(screen.getByText(/Number of cards/)).toBeVisible();
    expect(screen.getByAltText('1-name')).toBeVisible();
    expect(screen.getByText('1-name')).toBeVisible();
    expect(screen.getByText('4')).toBeVisible();
  });

  it('shows pagination', () => {
    const cards = cardsFrom(50);
    const numberItemsInPage = 10;

    renderComponent({ cards, numberItemsInPage });

    expect(screen.getByText('9-name')).toBeVisible();
    expect(screen.queryByText('10-name')).not.toBeInTheDocument();
  });

  it('can change page', () => {
    const cards = cardsFrom(50);
    const numberItemsInPage = 10;
    renderComponent({ cards, numberItemsInPage });

    expect(screen.getByText('9-name')).toBeVisible();
    expect(screen.queryByText('10-name')).not.toBeInTheDocument();
  });

  const renderComponent = (props?: Record<string, unknown>): void => {
    const defaultProps = {
      cards: [],
      numberItemsInPage: 10
    };

    render(<CardTable {...defaultProps} {...props} />);
  };
});