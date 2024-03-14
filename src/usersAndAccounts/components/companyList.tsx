import * as React from 'react';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { Company, CompanyListProps } from '../utils/types';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../utils/tableStyles';
import { useNavigate } from 'react-router-dom';


const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
    const navigate = useNavigate();

    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        navigate(`/korisnik?id=${id}`)
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Naziv</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj telefona</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj faksa</StyledHeadTableCell>
                        <StyledHeadTableCell>Pib</StyledHeadTableCell>
                        <StyledHeadTableCell>Maticni broj</StyledHeadTableCell>
                        <StyledHeadTableCell>Sifra delatnosti</StyledHeadTableCell>
                        <StyledHeadTableCell>Registarski broj</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {companies?.map((company: Company) => (
                        <StyledTableRow key={company.maticni_broj} id={company.maticni_broj} onClick={handleSelect}>
                            <StyledTableCell>{company.naziv}</StyledTableCell>
                            <StyledTableCell>{company.brojTelefona}</StyledTableCell>
                            <StyledTableCell>{company.broj_faksa}</StyledTableCell>
                            <StyledTableCell>{company.pib}</StyledTableCell>
                            <StyledTableCell>{company.maticni_broj}</StyledTableCell>
                            <StyledTableCell>{company.sifra_delatnosti}</StyledTableCell>
                            <StyledTableCell>{company.registarski_broj}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompanyList;