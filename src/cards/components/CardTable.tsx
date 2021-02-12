import React, { FunctionComponent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Card } from '../../repositories';

type Props = {
  cards: Card[],
  numberItemsInPage: number
};

const CardTable: FunctionComponent<Props> = ({ cards, numberItemsInPage }:Props): JSX.Element => {
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (_:unknown, newPage: number):void => {
    setPage(newPage);
  };

  const cardsToShow = cards.slice(page * numberItemsInPage, page * numberItemsInPage + numberItemsInPage);
  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Card name</TableCell>
              <TableCell>Number of cards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardsToShow.map((card) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={card._id}>
                <TableCell> <img src={card.imageUrl} alt={card.name} /></TableCell>
                <TableCell>{card.name}</TableCell>
                <TableCell>{card.count.total}</TableCell>
              </TableRow>
            ))}
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