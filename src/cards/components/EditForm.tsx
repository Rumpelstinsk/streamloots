import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card } from '../../repositories';
import Image from '../../components/Image';
import './EditForm.css';


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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.dataForm}>
          <div className="EditForm_cardDataForm">
            <div style={styles.formItem}>
              <span style={styles.labelForm}>Name</span>
              <input style={styles.input} type="text" aria-label="Name of the card" value={state.name} onChange={handleChange} name="name" />
            </div>
            <div style={styles.formItem}>
              <span style={styles.labelForm}>Image url</span>
              <input style={styles.input} type="text" aria-label="Url of the card" value={state.url} onChange={handleChange} name="url" />
            </div>
            <div style={styles.formItem}>
              <span style={styles.labelForm}>Total</span>
              <input style={styles.input} type="text" aria-label="Total number of cards" value={card.count.total} disabled={true} />
            </div>
          </div>

          <div className="EditForm_displayImage" style={styles.displayImage}>
            <Image src={state.url} alt={state.name} />
          </div>
        </div>

        <div style={styles.divButtons}>
          <button style={styles.saveButton} type="button" disabled={disableSaveButton} onClick={handleClick}>Save</button>
          <button style={styles.cancelButton} type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '80%',
    margin: '0 auto',
    height: '100%',
    position: 'relative',
    paddingTop: '25px'
  },
  formContainer: {
    backgroundColor: 'white',
    float: 'left',
    width: '100%'
  },  
  formItem: {
    padding: '5px 10px'
  },
  labelForm: {
    fontSize: '25px'
  },
  input: {
    width: '100%',
    fontSize: '20px',
    display: 'block'
  },
  divButtons: {
    float: 'right'
  },
  saveButton: {
    padding: '10px 35px',
    backgroundColor: '#1e69da',
    color: 'white',
    fontSize: '20px',
    border: 'none',
    borderRadius: '30px',
    marginTop: '5px',
    marginRight: '5px',
    cursor: 'pointer'
  },
  cancelButton:{
    padding: '10px 35px',
    backgroundColor: '#4a5d79',
    color: 'white',
    fontSize: '20px',
    border: 'none',
    borderRadius: '30px',
    marginTop: '5px',
    marginRight: '5px',
    cursor: 'pointer'
  }
};

export default EditForm;