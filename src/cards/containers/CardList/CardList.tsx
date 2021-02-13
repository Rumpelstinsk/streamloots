import React, { FunctionComponent, useEffect } from 'react';
import { Navigation } from '../../../navigation';
import { useCards, useRefreshCards } from '../../../store';
import CardTable from './components/CardTable';

const CardList: FunctionComponent = (): JSX.Element => {
  const { cards, deleteCard } = useCards();
  const { refreshCards } = useRefreshCards();

  useEffect(() => {
    if (cards.length <= 0) refreshCards();
  }, [cards.length, refreshCards]);

  const handleRowClick = (id: string):void => {
    Navigation.toCardDetail(id);
  };

  const handleDelete = (id: string):void => {
    deleteCard(id);
  };
  
  return (
    <CardTable cards={cards} numberItemsInPage={10} onClick={handleRowClick} onDelete={handleDelete} />
  );
};

export default CardList;