import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '../../../../components';
import './PlainForm.css';

type Props = {
  cardName: string,
  minCard: number | null,
  onFilterChange: (cardName: string, minCard: number | null) => void,
  onClearFilter: () => void
};

type FilterState = {
  cardName: string,
  minCard: string
};


const PlainForm: FunctionComponent<Props> = ({
  cardName,
  minCard,
  onFilterChange,
  onClearFilter
}: Props): JSX.Element => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    cardName,
    minCard: minCard ? minCard.toString() : ''
  });

  useEffect(() => {
    setFilterState({
      cardName,
      minCard: minCard ? `${minCard}` : ''
    });
  }, [cardName, minCard]);

  const delayedSearch = (newCardName: string, newMinCard: string): void => {
    onFilterChange(newCardName, newMinCard ? parseInt(newMinCard, 10) : null);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const filters = {
      ...filterState,
      [event.target.name]: event.target.value
    };
    setFilterState(filters);
    setTypingTimeout(setTimeout(() => delayedSearch(filters.cardName, filters.minCard), 500));
  };

  return (
    <div>
      <div className="filters">
        <input className="inputFilter" type="text" name="cardName" aria-label="Filter by card name" placeholder="Write a card name" value={filterState.cardName} onChange={handleChange} />
      </div>
      <div className="filters">
        <input className="inputFilter" type="number" name="minCard" aria-label="Filter by number of cards" placeholder="Write a number of cards" value={filterState.minCard} onChange={handleChange} />
      </div>
      <div className="clearFilter">
        <Button id="PlainForm_ClearFilterButton" mode="normal" onClick={onClearFilter}>Clear</Button>
      </div>
    </div>
  );
};

export default PlainForm;