import React, { useState, useEffect } from 'react';
import './../App.css';
import { Account } from '../utils/types';
import { makeGetRequest } from '../utils/apiRequest';
import { getMe } from '../utils/getMe';

const auth = getMe();
let emailKorisnikov = "";
if (auth) {
  emailKorisnikov = auth.sub;
  console.log(emailKorisnikov);
} else {
  console.error("Nije moguće dobiti informacije o korisniku.");
}

type Transakcija = {
  nazivPrimaoca: string,
  racunPrimaoca: string,
  iznos: number,
  pozivNaBroj: string,
  status: string,
  vremeTransakcije: string;
  sifraPlacanja: string;
  svrhaPlacanja: string;
  vremeIzvrsavanja: string;
}

type Sredstvo = {
  prviRacun: string,
  drugiRacun: string,
  iznos: number,
  status: string,
  vreme: string,
  vremeIzvrsavanja: string
}

const AccountInfoPage: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    brojRacuna: '',
    stanje: 0,
    raspolozivoStanje: 0,
    datumKreiranja: '',
    datumIsteka: '',
    currency: '',
    vrstaRacuna: '',
    aktivan: true,
    kamatnaStopa: '',
    odrzavanjeRacuna: '',
    zaposleni: -1,
    vlasnik: -1
  });
  const [emailVlasnika, setEmailVlasnika] = useState('');
  const [transactions, setTransatcions] = useState<Transakcija[]>([]);
  const [sredstva, setSredstva] = useState<Sredstvo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Pročitajte podatke iz Local Storage
      const storedAccountString = localStorage.getItem('selectedAccount');

      // Proverite da li postoje podaci
      if (storedAccountString) {
        const storedAccount = JSON.parse(storedAccountString);
        // Možete koristiti storedAccount na željeni način
        setAccount(storedAccount);
        console.log(storedAccount);
        console.log("JEJ");
        setEmailVlasnika(emailKorisnikov);
        try {
          const brojRacuna = storedAccount.brojRacuna;

          const transakcije = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${brojRacuna}`);
          const sredstva = await makeGetRequest(`/transaction/getAllPrenosSredstavaByBrojRacuna/${brojRacuna}`);

          if (transakcije) {
            console.log(transactions)
            setTransatcions(transakcije)
          }

          if (sredstva) {
            setSredstva(sredstva);
          }


        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        console.log("Nema podataka o nalogu u Local Storage-u.");
      }


    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Stranica za pojedinacni racun sa pocetnim stanjima</h2>
      <div style={{ paddingBottom: '20px', display: 'inline-block', textAlign: 'left', marginLeft: 'auto', marginRight: 'auto' }}>

        <table className="custom-table-bank">
          <tbody>
            <tr className="table-row">
              <td className="table-cell">Broj računa:</td>
              <td className="table-cell">{account.brojRacuna}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Stanje:</td>
              <td className="table-cell">{account.stanje}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Raspoloživo stanje:</td>
              <td className="table-cell">{account.raspolozivoStanje}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Datum kad je račun kreiran:</td>
              <td className="table-cell">{account.datumKreiranja}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Datum kad račun ističe:</td>
              <td className="table-cell">{account.datumIsteka}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Valuta računa:</td>
              <td className="table-cell">{account.currency}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Status računa:</td>
              <td className="table-cell">{account.aktivan ? 'Aktivan' : 'Neaktivan'}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Kamatna stopa:</td>
              <td className="table-cell">{account.kamatnaStopa}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Cena održavanja računa:</td>
              <td className="table-cell">{account.odrzavanjeRacuna}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Mejl korisnika:</td>
              <td className="table-cell">{emailVlasnika}</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">Mejl zaposlenog:</td>
              <td className="table-cell">{account.zaposleni}</td>
            </tr>
          </tbody>
        </table>

        <h3>Podaci o transakciji:</h3>
        <table className="custom-table-bank">
          <thead>
            <tr className="table-row">
              <th className="table-cell">Naziv primaoca</th>
              <th className="table-cell">Broj računa primaoca</th>
              <th className="table-cell">Iznos</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Datum i vreme transakcije</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transakcija, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{transakcija.nazivPrimaoca}</td>
                <td className="table-cell">{transakcija.racunPrimaoca}</td>
                <td className="table-cell">{transakcija.iznos.toString()}</td>
                <td className="table-cell">{transakcija.status}</td>
                <td className="table-cell">{new Date(transakcija.vremeTransakcije).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <table className="custom-table-bank">
          <thead>
            <tr className="table-row">
              <th className="table-cell">Prvi racun</th>
              <th className="table-cell">Drugi racun</th>
              <th className="table-cell">Iznos</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Datum i vreme transakcije</th>
              <th className="table-cell">Datum i vreme izvrsavanja</th>
            </tr>
          </thead>
          <tbody>
            {sredstva?.map((sredstvo, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{sredstvo.prviRacun}</td>
                <td className="table-cell">{sredstvo.drugiRacun}</td>
                <td className="table-cell">{sredstvo.iznos.toString()}</td>
                <td className="table-cell">{sredstvo.status}</td>
                <td className="table-cell">{new Date(sredstvo.vreme).toDateString()}</td>
                <td className="table-cell">{new Date(sredstvo.vremeIzvrsavanja).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );


}

export default AccountInfoPage;
