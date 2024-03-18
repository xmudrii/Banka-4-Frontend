import React from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';

interface TabelaProps {
    krediti: Kredit[];
    onClickRed: (kredit: Kredit) => void;
}

const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <StyledTableHead>
                    <StyledTableRow>
                        <StyledHeadTableCell>Vrsta kredita</StyledHeadTableCell>
                        <StyledHeadTableCell>Iznos kredita</StyledHeadTableCell>
                        <StyledHeadTableCell>Svrha kredita</StyledHeadTableCell>
                        <StyledHeadTableCell>Iznos mesečne plate</StyledHeadTableCell>
                        <StyledHeadTableCell>Zaposlen za stalno</StyledHeadTableCell>
                        <StyledHeadTableCell>Period zaposlenja kod trenutnog poslodavca</StyledHeadTableCell>
                        <StyledHeadTableCell>Ročnost</StyledHeadTableCell>
                        <StyledHeadTableCell>Ekspozitura</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj mobilnog telefona</StyledHeadTableCell>
                        <StyledHeadTableCell>Status</StyledHeadTableCell>
                    </StyledTableRow>
                </StyledTableHead>
                <TableBody>
                    {krediti.map((kredit, index) => (
                        <StyledTableRow key={index} onClick={() => onClickRed(kredit)}>
                            <StyledTableCell>{kredit.VrstaKredita}</StyledTableCell>
                            <StyledTableCell>{kredit.IznosKredita}</StyledTableCell>
                            <StyledTableCell>{kredit.SvrhaKredita}</StyledTableCell>
                            <StyledTableCell>{kredit.IznosMesecnePlate}</StyledTableCell>
                            <StyledTableCell>{kredit.ZaposlenZaStalno}</StyledTableCell>
                            <StyledTableCell>{kredit.PeriodZaposlenja}</StyledTableCell>
                            <StyledTableCell>{kredit.Rocnost}</StyledTableCell>
                            <StyledTableCell>{kredit.Ekspozitura}</StyledTableCell>
                            <StyledTableCell>{kredit.BrojMobilnogTelefona}</StyledTableCell>
                            <StyledTableCell>{kredit.Status}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
