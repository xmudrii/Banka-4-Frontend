import * as React from 'react';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { Account, AccountListProps } from '../utils/types';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../utils/tableStyles';
import { useNavigate } from 'react-router-dom';

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  const navigate = useNavigate();

  const handleSelect = (event: any) => {
    const id = event.currentTarget.id;
    navigate(`/racun?id=${id}`)
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <StyledTableHead>
          <TableRow>
            <StyledHeadTableCell>Broj Racuna</StyledHeadTableCell>
            <StyledHeadTableCell>Stanje</StyledHeadTableCell>
            <StyledHeadTableCell>Raspolozivo Stanje</StyledHeadTableCell>
            <StyledHeadTableCell>Datum Kreiranja</StyledHeadTableCell>
            <StyledHeadTableCell>Datum Isteka</StyledHeadTableCell>
            <StyledHeadTableCell>Valuta</StyledHeadTableCell>
            <StyledHeadTableCell>Vrsta</StyledHeadTableCell>
            <StyledHeadTableCell>Status</StyledHeadTableCell>
            <StyledHeadTableCell>Kamatna Stopa</StyledHeadTableCell>
            <StyledHeadTableCell>Cena Odrzavanja</StyledHeadTableCell>

          </TableRow>
        </StyledTableHead>
        <TableBody>
          {accounts?.map((accounts: Account) => (
            <StyledTableRow key={accounts.brojRacuna} id={accounts.brojRacuna} onClick={handleSelect}>
              <StyledTableCell>{accounts.brojRacuna}</StyledTableCell>
              <StyledTableCell>{accounts.stanje}</StyledTableCell>
              <StyledTableCell>{accounts.raspolozivoStanje}</StyledTableCell>
              <StyledTableCell>{accounts.datumKreiranja}</StyledTableCell>
              <StyledTableCell>{accounts.datumIsteka}</StyledTableCell>
              <StyledTableCell>{accounts.currency}</StyledTableCell>
              <StyledTableCell>{accounts.vrstaRacuna}</StyledTableCell>
              <StyledTableCell>{accounts.aktivan}</StyledTableCell>
              <StyledTableCell>{accounts.kamatnaStopa ?? ''}</StyledTableCell>
              <StyledTableCell>{accounts.odrzavanjeRacuna ?? ''}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountList;