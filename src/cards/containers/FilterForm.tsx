import React, { FunctionComponent } from 'react';
import { useFilters } from '../../store';
import PlainForm from './components/PlainForm';


const FilterForm: FunctionComponent = (): JSX.Element => {
  const { cardName, minCards, clearFilters, setCardName, setMinCards } = useFilters();
    
  const handleFilterChange = (newCardName:string, newMinCards: number|null):void => {
    if (newCardName !== cardName) setCardName(newCardName);
    if (newMinCards !== minCards) setMinCards(newMinCards);
  };

  return (
    <PlainForm 
      cardName={cardName} 
      minCard={minCards} 
      onFilterChange={handleFilterChange} 
      onClearFilter={clearFilters}  
    />
  );
};

export default FilterForm;