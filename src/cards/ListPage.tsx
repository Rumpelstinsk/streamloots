import React, { FunctionComponent } from 'react';
import { useCards } from '../store';
import CardTable from './components/CardTable';
import FilterForm from './containers/FilterForm/FilterForm';

const ListPage: FunctionComponent = (): JSX.Element => {
  const { cards } = useCards();

  return (
    <div>
      <FilterForm />
      <CardTable cards={cards} numberItemsInPage={10} />
    </div>
  );
};

export default ListPage;