import React, { FunctionComponent } from 'react';
import './Button.css';

type Props = { mode: 'normal' | 'cancel' } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ mode, children, ...props }: Props): JSX.Element => (
  <button type='button' {...props} className={`BaseComponent_${mode} BaseComponent_button`}>{children}</button>
);