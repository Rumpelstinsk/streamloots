import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { cardFrom } from '../../../tests/helpers/card-helper';
import EditForm from './EditForm';

describe('EditForm', () => {
  it('shows a form to update card data', () => {
    const card = cardFrom(5);

    renderComponent({ card });

    expect(screen.getByText(/Name/)).toBeVisible();
    expect(screen.getByText(/Total/)).toBeVisible();
    expect(screen.getByText(/Image url/)).toBeVisible();
    expect(screen.getByDisplayValue('5-url')).toBeVisible();
    expect(screen.getByDisplayValue('5-name')).toBeVisible();
    expect(screen.getByDisplayValue('5')).toBeVisible();
    expect(screen.getByText(/Save/)).toBeVisible();
    expect(screen.getByText(/Cancel/)).toBeVisible();
    expect(screen.getByAltText('5-name')).toBeVisible();
  });

  it('updates image when url changes', () => {
    const card = cardFrom(5);
    const newUrl = 'new-url';
    renderComponent({ card });

    userEvent.clear(screen.getByLabelText('Url of the card'));
    userEvent.type(screen.getByLabelText('Url of the card'), newUrl);

    expect(screen.getByAltText(card.name).getAttribute('src')).toEqual(newUrl);
  });

  it('disables saves button when name is empty', () => {
    renderComponent();

    userEvent.clear(screen.getByLabelText('Name of the card'));

    expect(screen.getByText(/Save/)).toBeDisabled();
  });

  it('disables saves button when url is empty', () => {
    renderComponent();

    userEvent.clear(screen.getByLabelText('Url of the card'));

    expect(screen.getByText(/Save/)).toBeDisabled();
  });

  it('triggers a callback when save button is clicked', () => {
    const card = cardFrom(5);
    const updatedCard = { ...card, name: 'new name', imageUrl: 'new url' };
    const onSave = jest.fn();
    renderComponent({ onSave, card });

    const nameInput = screen.getByLabelText('Name of the card');
    userEvent.clear(nameInput);
    userEvent.type(nameInput, updatedCard.name);
    const urlInput = screen.getByLabelText('Url of the card');
    userEvent.clear(urlInput);
    userEvent.type(urlInput, updatedCard.imageUrl);
    userEvent.click(screen.getByText(/Save/));

    expect(onSave).toHaveBeenCalledWith(updatedCard);
  });

  it('triggers a callback when cancel button is clicked', () => {
    const onCancel = jest.fn();
    renderComponent({ onCancel });

    userEvent.click(screen.getByText(/Cancel/));

    expect(onCancel).toHaveBeenCalledWith();
  });

  const renderComponent = (props?: Record<string, unknown>): void => {
    const defaultProps = {
      card: cardFrom(1),
      onSave: jest.fn(),
      onCancel: jest.fn()
    };

    render(<EditForm {...defaultProps} {...props} />);
  };
});