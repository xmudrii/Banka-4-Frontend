import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserAndAccountList from './zaposleni/pages/listsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInfoTable from './zaposleni/pages/userPage';
import Navbar from './zaposleni/components/Navbar';
import CreateUserPage from './zaposleni/pages/createUserPage';
import EditUserPage from './zaposleni/pages/editUserPage';
import CreateAccountPage from './zaposleni/pages/createAccountPage';
import AccountInfoPage from './zaposleni/pages/accountPage';
import CreateEmployeePage from './zaposleni/pages/createEmployeePage';
import EditEmployeePage from './zaposleni/pages/editEmployeePage';
import CreateCompanyPage from './zaposleni/pages/createCompanyPage';
import EditCompanyPage from './zaposleni/pages/editCompanyPage';
import LoginPage from './moduls/LogReg/LoginPage';
import RegistrationPage from './moduls/LogReg/RegistrationPage';
import { getMe } from './utils/getMe';
import Placanje from './korisnici/pages/PlacanjePage';
import UserHomePage from 'korisnici/pages/UserHomePage';
import ResetPasswordPage from 'korisnici/pages/ResetPasswordPage';
import Verifikacija from 'korisnici/pages/StranicaZaVerifikacijuPlacanja';
import StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike from 'korisnici/pages/StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike';
const auth = getMe()
function App() {
  return (
    <BrowserRouter>
      {auth?.id && <Navbar></Navbar>}
      <Routes>
        <Route path="/" element={auth?.id ? <UserHomePage /> : <LoginPage />} />
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
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/verifikacija" element={auth?.id ? <Verifikacija /> : <LoginPage />} />
        <Route path="/placanja" element={auth?.id ? <Placanje /> : <LoginPage />} />
        <Route path="/stranica-za-pojedinacni-racun" element={auth?.id ? <StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike /> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
