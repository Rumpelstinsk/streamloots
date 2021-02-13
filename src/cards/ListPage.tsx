import React, { FunctionComponent, useEffect } from 'react';
import Navigation from '../navigation/navigation';
import { useCards } from '../store';
import { useRefreshCards } from '../store/hooks/use-refresh-cards';
import CardTable from './components/CardTable';
import FilterForm from './containers/FilterForm/FilterForm';

const ListPage: FunctionComponent = (): JSX.Element => {
  const { cards } = useCards();
  const { refreshCards } = useRefreshCards();

  useEffect(() => {
    if (cards.length <= 0) refreshCards();
  }, [cards.length, refreshCards]);

  const handleRowClick = (id: string):void => {
    Navigation.toCardDetail(id);
  };
  
  return (
    <div>
      <FilterForm />
      <CardTable cards={cards} numberItemsInPage={10} onClick={handleRowClick} />
    </div>
  );
};

export default ListPage;