import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Image } from './Image';

describe('Loading', () => {
  it('shows an image', () => {
    const alt = 'alt-image';
    
    renderComponent({ alt });

    expect(screen.getByAltText(alt)).toBeVisible();
  });

  it('shows a custom image when image fails to load', () => {
    const alt = 'alt-image';
    renderComponent({ alt });

    ReactTestUtils.Simulate.error(screen.getByAltText(alt));    

    expect(screen.queryByAltText(alt)).not.toBeInTheDocument();
    expect(screen.getByAltText(/No image/)).toBeVisible();
  });

  const renderComponent = (props?: Record<string, unknown>):void =>{
    const defaultProps = {
      src: 'an-url'
    };
    render(<Image {...defaultProps} {...props} />);
  };
});