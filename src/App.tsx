import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserAndAccountList from './usersAndAccounts/pages/listsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInfoTable from './usersAndAccounts/pages/userPage';
import Navbar from './usersAndAccounts/components/Navbar';
import CreateUserPage from './usersAndAccounts/pages/createUserPage';
import EditUserPage from './usersAndAccounts/pages/editUserPage';
import CreateAccountPage from './usersAndAccounts/pages/createAccountPage';
import AccountInfoPage from './usersAndAccounts/pages/accountPage';
import CreateEmployeePage from './usersAndAccounts/pages/createEmployeePage';
import EditEmployeePage from './usersAndAccounts/pages/editEmployeePage';
import CreateCompanyPage from './usersAndAccounts/pages/createCompanyPage';
import EditCompanyPage from './usersAndAccounts/pages/editCompanyPage';
import LoginPage from './moduls/LogReg/LoginPage';
import RegistrationPage from './moduls/LogReg/RegistrationPage';
import { getMe } from './utils/getMe';
const auth = getMe()
function App() {
  return (
    <BrowserRouter>
      {auth?.id && <Navbar></Navbar>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/listaKorisnika" element={auth?.id ? <UserAndAccountList /> : <LoginPage />} />
        <Route path="/korisnik" element={auth?.id ? <UserInfoTable /> : <LoginPage />} />
        <Route path="/kreirajKorisnika" element={auth?.id ? <CreateUserPage /> : <LoginPage />} />
        <Route path="/izmeniKorisnika" element={auth?.id ? <EditUserPage /> : <LoginPage />} />
        <Route path="/racun" element={auth?.id ? <AccountInfoPage /> : <LoginPage />} />
        <Route path="/kreirajRacun" element={auth?.id ? <CreateAccountPage /> : <LoginPage />} />
        <Route path="/kreirajZaposlenog" element={auth?.id ? <CreateEmployeePage /> : <LoginPage />} />
        <Route path="/izmeniZaposlenog" element={auth?.id ? <EditEmployeePage /> : <LoginPage />} />
        <Route path="/kreirajFirmu" element={auth?.id ? <CreateCompanyPage /> : <LoginPage />} />
        <Route path="/izmeniFirmu" element={auth?.id ? <EditCompanyPage /> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
