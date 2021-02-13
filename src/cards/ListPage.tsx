import React, { FunctionComponent } from 'react';
import CardList from './containers/CardList/CardList';
import FilterForm from './containers/FilterForm/FilterForm';
import './ListPage.css';

const ListPage: FunctionComponent = (): JSX.Element => (
  <div className="container">
    <div className="filterContent">
      <FilterForm />
    </div>
    <div className="cardList">
      <CardList />
    </div>      
  </div>
);

export default ListPage;