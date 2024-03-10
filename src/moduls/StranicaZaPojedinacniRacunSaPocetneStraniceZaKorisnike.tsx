import React, { useState, useEffect } from 'react';
import './../App.css';

function DataFetchingPage() {
  const [data, setData] = useState<any>(null); // Definisanje tipa 'data' kao 'any'
  const [error, setError] = useState<string | null>(null); // Definisanje tipa 'error' kao 'string | null'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('url_za_preuzimanje_podataka');
        if (!response.ok) {
          throw new Error('Neuspešan zahtev');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Došlo je do greške'); // Provera da li je greška tipa Error pre pristupa message property
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Stranica za pojedinacni racun sa pocetnim stanjima</h2>
      <div style={{ paddingBottom: '20px', display: 'inline-block', textAlign: 'left', marginLeft: 'auto', marginRight: 'auto' }}>
      
      <table className="custom-table-bank">
  <tbody>
    <tr className="table-row">
      <td className="table-cell">Broj računa:</td>
      <td className="table-cell">{/*data.accountNumber*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Stanje:</td>
      <td className="table-cell">{/*data.balance*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Raspoloživo stanje:</td>
      <td className="table-cell">{/*data.availableBalance*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Datum kad je račun kreiran:</td>
      <td className="table-cell">{/*data.dateCreated*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Datum kad račun ističe:</td>
      <td className="table-cell">{/*data.expiryDate*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Valuta računa:</td>
      <td className="table-cell">{/*data.currency*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Vrsta računa:</td>
      <td className="table-cell">{/*data.accountType*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Status računa:</td>
      <td className="table-cell">{/*data.accountStatus*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Kamatna stopa:</td>
      <td className="table-cell">{/*data.interestRate || "N/A"*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Cena održavanja računa:</td>
      <td className="table-cell">{/*data.accountMaintenancePrice || "N/A"*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Mejl korisnika:</td>
      <td className="table-cell">{/*data.userEmail*/}</td>
    </tr>
    <tr className="table-row">
      <td className="table-cell">Mejl zaposlenog:</td>
      <td className="table-cell">{/*data.employeeEmail*/}</td>
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
          <tr className="table-row">
            <td className="table-cell">Primalac 1</td>
            <td className="table-cell">123456789</td>
            <td className="table-cell">1000</td>
            <td className="table-cell">123456</td>
            <td className="table-cell">Uspeh</td>
            <td className="table-cell">2024-03-10 14:30:00</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Primalac 2</td>
            <td className="table-cell">987654321</td>
            <td className="table-cell">500</td>
            <td className="table-cell">654321</td>
            <td className="table-cell">U obradi</td>
            <td className="table-cell">2024-03-10 15:45:00</td>
          </tr>
          {/* Dodajte dodatne redove za ostale transakcije */}
        </tbody>
      </table>
            
      </div>
    </div>
  );
  
  
}

export default DataFetchingPage;
