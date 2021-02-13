import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Card } from '../../../../repositories';
import { Image, Button } from '../../../../components';


type Props = {
  cards: Card[],
  numberItemsInPage: number,
  onClick: (id: string) => void,
  onDelete: (id: string) => void
};
const useStyles = makeStyles({
  customTableContainer: {
    overflowX: 'initial'
  },
  customRow: {
    cursor: 'pointer'
  }
});

type CardRowProps = {
  card: Card,
  onClick: (id: string) => void,
  onDelete: (id: string) => void
};
const CardRow: FunctionComponent<CardRowProps> = ({ card, onClick, onDelete }: CardRowProps): JSX.Element => {
  const classes = useStyles();

  const handleClick = (): void => {
    onClick(card._id);
  };

  const handleDelete = ():void => {
    onDelete(card._id);
  };

  return (
    <TableRow classes={{ root: classes.customRow }} hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Button
          mode="normal"
          id={`CardTable_DeleteButton_${card._id}`}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
      <TableCell onClick={handleClick}><Image src={card.imageUrl} alt={card.name} /></TableCell>
      <TableCell onClick={handleClick}>{card.name}</TableCell>
      <TableCell onClick={handleClick}>{card.count.total}</TableCell>
    </TableRow>
  );
};

const CardTable: FunctionComponent<Props> = ({ cards, numberItemsInPage, onClick, onDelete }: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (_: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleEditClick = (id: string): void => {
    onClick(id);
  };

  const handleDeleteClick = (id: string): void => {
    onDelete(id);
  };

  const cardsToShow = cards.slice(page * numberItemsInPage, page * numberItemsInPage + numberItemsInPage);
  return (
    <Paper>
      <TableContainer classes={{ root: classes.customTableContainer }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Card name</TableCell>
              <TableCell>Number of cards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardsToShow.map(
              (card) => <CardRow key={card._id} card={card} onClick={handleEditClick} onDelete={handleDeleteClick} /> )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={cards.length}
        rowsPerPage={numberItemsInPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};

export default CardTable;