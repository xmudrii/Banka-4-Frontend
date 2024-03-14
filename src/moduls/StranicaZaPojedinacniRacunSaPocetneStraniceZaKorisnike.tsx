import React, { useState, useEffect } from 'react';
import './../App.css';
import { Account } from '../utils/types';
import { makeGetRequest } from '../utils/apiRequest';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("jej")
        const brojRacuna = "444000000000000333"
        const jmbg = "1802001739921"
        if (brojRacuna && jmbg) {
          const res = await makeGetRequest(`/racuni/nadjiTekuciRacunPoBroju/${brojRacuna}`);
          if (res) {
            setAccount(res)
            const vlasnik = await makeGetRequest(`/korisnik/jmbg/${jmbg}`);
            if (vlasnik && vlasnik.jmbg) {
              setEmailVlasnika(vlasnik.email)
              const transakcije = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${brojRacuna}`);
              if (transakcije) {
                console.log(transactions)
                setTransatcions(transakcije)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
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
              <td className="table-cell">{account.vrstaRacuna}</td>
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
              <th className="table-cell">Poziv na broj</th>
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
                <td className="table-cell">{transakcija.pozivNaBroj}</td>
                <td className="table-cell">{transakcija.status}</td>
                <td className="table-cell">{new Date(transakcija.vremeTransakcije).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );


}

export default AccountInfoPage;
