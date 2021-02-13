import React, { FunctionComponent, useEffect } from 'react';
import { Navigation } from '../navigation';
import { useCards, useRefreshCards } from '../store';

import CardTable from './components/CardTable/CardTable';
import FilterForm from './containers/FilterForm/FilterForm';
import './ListPage.css';

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
    <div className="container">
      <div className="filterContent">
        <FilterForm />
      </div>
      <div className="cardList">
        <CardTable cards={cards} numberItemsInPage={10} onClick={handleRowClick} />
      </div>      
    </div>
  );
};

export default ListPage;