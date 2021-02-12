import React, { FunctionComponent } from 'react';

type Props = {
  message?: string
};
export const Loading: FunctionComponent<Props> = ({ message }:Props): JSX.Element => (
  <div>{message}</div>
);

Loading.defaultProps = { message: 'Loading...' };