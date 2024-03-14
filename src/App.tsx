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

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/listaKorisnika" element={<UserAndAccountList/>} />
        <Route path="/korisnik" element={<UserInfoTable/>} />
        <Route path="/kreirajKorisnika" element={<CreateUserPage/>} />
        <Route path="/izmeniKorisnika" element={<EditUserPage/>} />
        <Route path="/racun" element={<AccountInfoPage/>} />
        <Route path="/kreirajRacun" element={<CreateAccountPage/>} />
        <Route path="/kreirajZaposlenog" element={<CreateEmployeePage/>} />
        <Route path="/izmeniZaposlenog" element={<EditEmployeePage/>} />
        <Route path="/kreirajFirmu" element={<CreateCompanyPage/>} />
        <Route path="/izmeniFirmu" element={<EditCompanyPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
