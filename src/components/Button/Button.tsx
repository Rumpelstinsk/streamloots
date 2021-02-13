import React, { FunctionComponent } from 'react';
import { Analitics } from '../../analitics';
import './Button.css';

type Props = { mode: 'normal' | 'cancel', id: string } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ id, mode, children, onClick, ...props }: Props): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    event.preventDefault();    
    Analitics.saveClick(id);
    if (onClick) onClick(event);
  };

  return (
    <button 
      id={id}
      type='button' 
      className={`BaseComponent_${mode} BaseComponent_button`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};