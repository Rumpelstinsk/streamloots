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
import { Card } from '../../repositories';
import Image from '../../components/Image';
import './CardTable.css';


type Props = {
  cards: Card[],
  numberItemsInPage: number,
  onClick: (id:string) => void
};
const useStyles = makeStyles({
  customTableContainer: {
    overflowX: 'initial'
  },
  customRow: {
    cursor: 'pointer'
  }
});

const CardTable: FunctionComponent<Props> = ({ cards, numberItemsInPage, onClick }:Props): JSX.Element => {  
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (_:unknown, newPage: number):void => {
    setPage(newPage);
  };

  const handleRowClick = (id:string):void => {
    onClick(id);
  };

  const cardsToShow = cards.slice(page * numberItemsInPage, page * numberItemsInPage + numberItemsInPage);
  return (
    <Paper>
      <TableContainer classes={{ root: classes.customTableContainer }}>
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
              <TableRow classes={{ root: classes.customRow }} hover role="checkbox" tabIndex={-1} key={card._id} onClick={():void => handleRowClick(card._id)}>
                <TableCell><Image src={card.imageUrl} alt={card.name} /></TableCell>
                <TableCell>{card.name}</TableCell>
                <TableCell className="hideOn400">{card.count.total}</TableCell>
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