import React, { FunctionComponent, useEffect, useState } from 'react';
import noImage from '../icons/no-image.png';

type Props = {
  src: string,
  alt?:string
};
const Image: FunctionComponent<Props> = ({ src, alt }:Props): JSX.Element => {
  const [error, setError] = useState(false);
    
  useEffect(() => {
    setError(false);
  }, [src]);

  const handleImageError = ():void => {
    setError(true);
  };
  return (
    <img src={error ? noImage : src} alt={error ? 'No image found' : alt} onError={handleImageError} />    
  );
};
    
Image.defaultProps = { alt: undefined };

export default Image;