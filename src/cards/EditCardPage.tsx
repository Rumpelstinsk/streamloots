import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { Card } from '../repositories';
import { useCards } from '../store';
import EditForm from './components/EditForm';
import { UpdateCard } from '../actions/update-card';

const ListPage: FunctionComponent = (): JSX.Element => {
  const { cards, editCard } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  
  const params = useParams<{ id:string }>();
  
  useEffect(() => {
    const cardFound = cards.find(item => item._id === params.id);
    if (cardFound) setCard(cardFound);
  }, [cards, params.id]);

  const handleSave = async (newCard:Card):Promise<void> => {
    const success = await UpdateCard.do(newCard);
    if (success) {
      editCard(newCard);
      Navigation.toDashboard();
    }
  };

  const handleCancel = ():void => {
    Navigation.toDashboard();
  };

  return (
    <>
      {!card && <span>Card not found</span>}
      {card &&
        <EditForm card={card} onSave={handleSave} onCancel={handleCancel} />}
    </>
    
  );
};

export default ListPage;