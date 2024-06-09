import {  Table, TableBody, TableRow } from '@mui/material';
import { Employee, EmployeeListProps } from '../../utils/types';
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from 'react-router-dom';
import { decodePermissions } from '../../utils/permissions';
import styled from 'styled-components';

const StyledTableCellLocal = styled(StyledTableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
    text-align: left!important;
  }
  &:last-child{
    word-break: break-all;
  }
`

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
    const navigate = useNavigate();
    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        navigate(`/izmeniZaposlenog?email=${id}`)
    };

    return (
        <ScrollContainer >
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Ime</StyledHeadTableCell>
                        <StyledHeadTableCell>Prezime</StyledHeadTableCell>
                        <StyledHeadTableCell>JMBG</StyledHeadTableCell>
                        <StyledHeadTableCell>Pol</StyledHeadTableCell>
                        <StyledHeadTableCell>Adresa</StyledHeadTableCell>
                        <StyledHeadTableCell>Mejl adresa</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj telefona</StyledHeadTableCell>
                        <StyledHeadTableCell>Pozicija</StyledHeadTableCell>
                        <StyledHeadTableCell>Departman</StyledHeadTableCell>
                        <StyledHeadTableCell>Permisije</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {employees?.map((employee: Employee) => (
                        <StyledTableRow key={employee.email} id={employee.email} onClick={handleSelect}>
                            <StyledTableCell>{employee.ime}</StyledTableCell>
                            <StyledTableCell>{employee.prezime}</StyledTableCell>
                            <StyledTableCell>{employee.jmbg}</StyledTableCell>
                            <StyledTableCell>{employee.pol}</StyledTableCell>
                            <StyledTableCell>{employee.adresa}</StyledTableCell>
                            <StyledTableCell>{employee.email}</StyledTableCell>
                            <StyledTableCell>{employee.brojTelefona}</StyledTableCell>
                            <StyledTableCell>{employee.pozicija}</StyledTableCell>
                            <StyledTableCell>{employee.departman}</StyledTableCell>
                            <StyledTableCellLocal>{decodePermissions(employee.permisije)}</StyledTableCellLocal>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    );
};

export default EmployeeList;