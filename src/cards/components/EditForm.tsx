import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card } from '../../repositories';
import Image from '../../components/Image';


type Props = {
  card: Card,
  onSave: (card: Card) => void,
  onCancel: () => void
};

const EditForm: FunctionComponent<Props> = ({ card, onSave, onCancel }: Props): JSX.Element => {
  const [state, setState] = useState({ name: '', url: '' });

  useEffect(() => {
    setState({
      name: card.name,
      url: card.imageUrl
    });
  }, [card]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleClick = (): void => {
    onSave({
      ...card,
      name: state.name,
      imageUrl: state.url
    });
  };

  const handleCancel = (): void => {
    onCancel();
  };

  const disableSaveButton = state.name.length <= 0 || state.url.length <= 0;
  return (
    <div>
      <div>
        <div>
          <span>Name</span>
          <input type="text" aria-label="Name of the card" value={state.name} onChange={handleChange} name="name" />
        </div>
        <div>
          <span>Total</span>
          <input type="text" aria-label="Total number of cards" value={card.count.total} disabled={true} />
        </div>
        <div>
          <span>Image url</span>
          <input type="text" aria-label="Url of the card" value={state.url} onChange={handleChange} name="url" />
        </div>
      </div>

      <div>
        <Image src={state.url} alt={state.name} />
      </div>

      <div>
        <button type="button" disabled={disableSaveButton} onClick={handleClick}>Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;