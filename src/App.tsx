import React, { useEffect, useState } from 'react';
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
import PregledKartica from 'moduls/Kartice/PregledKartica';
import DodajKarticu from 'moduls/Kartice/DodajKarticu';
import DetaljiKartice from 'moduls/Kartice/DetaljiKartice';
import ListaKredita from 'moduls/SviKrediti/listaKredita';
import TraziKreditStranica from 'moduls/TrazenjeKredita/TraziKreditOdBanke';
import PojedinacniKreditStranica from 'moduls/PojedinacniKredit/PojedinacniKreditStranica';
import OpcijePage from 'berza/pages/OpcijePage';
import UserOpcijePage from 'berza/pages/UserOptionsPage';
import Transaction from 'zaposleni/pages/TransactionPage';
import AkcijePage from 'berza/pages/AkcijePage';
import DetaljiAkcije from 'berza/pages/DetaljiAkcijePage';
import ExchangePage from 'menjacnica/ExchangePage';
import styled from 'styled-components';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const auth = getMe()
function App() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('si_jwt');
      }
    });
  }, [])
  return (
    <>
      {!auth?.id &&
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <VideoWrapper>
              <video autoPlay muted height="300" controls>
                <source src="https://cdn.discordapp.com/attachments/1161024401001680987/1224340251385004052/stop.mp4?ex=661d22b7&is=660aadb7&hm=b023e16a8c263142fbeeed37e364132d6cf6a447561502c19c405b201cfa6040&" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </VideoWrapper>
            <Typography variant="body2" sx={{ mt: 2, marginLeft: 'auto', marginRight: 'auto' }}>
              JWT STOP
            </Typography>
          </Box>
        </Dialog>

      }

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
          <Route path="/listaKredita" element={auth?.id ? <ListaKredita /> : <LoginPage />} />
          <Route path="/placanja" element={auth?.id ? <Placanje /> : <LoginPage />} />
          <Route path="/kartice" element={auth?.id ? <PregledKartica /> : <LoginPage />} />
          <Route path="/dodaj-karticu" element={auth?.id ? <DodajKarticu /> : <LoginPage />} />
          <Route path="/kartica" element={auth?.id ? <DetaljiKartice /> : <LoginPage />} />
          <Route path="/trazenjeKredita" element={auth?.id ? <TraziKreditStranica /> : <LoginPage />} />
          <Route path="/pojedinacniKredit" element={auth?.id ? <PojedinacniKreditStranica /> : <LoginPage />} />
          <Route path="/stranica-za-pojedinacni-racun" element={auth?.id ? <StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike /> : <LoginPage />} />
          <Route path="/opcije" element={auth?.id ? <OpcijePage /> : <LoginPage />} />
          <Route path="/userOpcije" element={auth?.id ? <UserOpcijePage /> : <LoginPage />} />
          <Route path="/transakcija" element={auth?.id ? <Transaction /> : <LoginPage />} />
          <Route path="/akcije" element={auth?.id ? <AkcijePage /> : <LoginPage />} />
          <Route path="/detaljiAkcije" element={auth?.id ? <DetaljiAkcije /> : <LoginPage />} />
          <Route path="/menjacnica" element={auth?.id ? <ExchangePage /> : <LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
