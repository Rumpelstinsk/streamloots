import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Analitics } from '../../analitics';
import { Button } from './Button';

describe('Loading', () => {
  it('renders a button', () => {
    renderComponent();

    expect(screen.getByText('Button')).toBeVisible();
  });

  it('record click on analitics system', () => {
    const id = 'a-button-id';
    const onClick = jest.fn();
    Analitics.saveClick = jest.fn();
    renderComponent({ id, onClick });

    userEvent.click(screen.getByText('Button'));

    expect(Analitics.saveClick).toHaveBeenCalledWith(id);
    expect(onClick).toHaveBeenCalled();
  });

  const renderComponent = (props?:Record<string, unknown>):void => {
    const defaultProps = {
      id: 'a-button'
    };
    render(<Button mode="normal" {...defaultProps} {...props}>Button</Button>);
  };
});