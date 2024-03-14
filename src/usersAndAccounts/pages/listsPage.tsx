import { AppBar, Tabs, Tab, Button } from '@mui/material';
import UserList from '../components/userList'
import { Account } from '../../utils/types';
import styled from 'styled-components';
import AccountList from '../components/accountList';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/employeeList';
import CompanyList from '../components/companyList';
import { useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;

`
const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`

const HeadingText = styled.div`
  font-size: 32px;
`

const accounts: Account[] = []

const UserAndAccountList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [usrs, setUsrs] = useState([])
  const [employees, setEmployees] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await makeGetRequest('/korisnik');
        setUsrs(users);
        const employees = await makeGetRequest('/radnik');
        setEmployees(employees)
        const companies = await makeGetRequest('/racuni/izlistajSveFirme');
        setCompanies(companies)
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };
    fetchData();

  }, []);

  const navigate = useNavigate();

  const handleCreateUser = (event: any) => {
    navigate(`/kreirajKorisnika`)
  };
  const handleCreateAccount = (event: any) => {
    navigate(`/kreirajRacun`)
  };
  const handleCreateEmployee = (event: any) => {
    navigate(`/kreirajZaposlenog`)
  };
  const handleCreateCompany = (event: any) => {
    navigate(`/kreirajFirmu`)
  };
  const handleChange = (event: React.SyntheticEvent<unknown>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const permissions = true
  const permissions2 = true
  const permissions3 = true
  const permissions4 = true


  return (
    <PageWrapper>

      <HeadingText>
        Liste
      </HeadingText>
      {permissions && selectedTab === 0 && <Button variant="contained" onClick={handleCreateUser}>
        Dodaj Korisnika
      </Button>}
      {permissions2 && selectedTab === 1 && <Button variant="contained" onClick={handleCreateAccount}>
        Dodaj Racun
      </Button>}
      {permissions3 && selectedTab === 2 && <Button variant="contained" onClick={handleCreateEmployee}>
        Dodaj Zaposlenog
      </Button>}
      {permissions4 && selectedTab === 3 && <Button variant="contained" onClick={handleCreateCompany}>
        Dodaj Firmu
      </Button>}
      <TableWrapper>
        <StyledTable>
          <AppBar position="static" >
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Lista Korisnika" />
              <Tab label="Lista Racuna" />
              <Tab label="Lista Zaposlenih" />
              <Tab label="Lista Firmi" />
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <UserList users={usrs} />}
          {selectedTab === 1 && <AccountList accounts={accounts} />}
          {selectedTab === 2 && <EmployeeList employees={employees} />}
          {selectedTab === 3 && <CompanyList companies={companies} />}
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default UserAndAccountList;
