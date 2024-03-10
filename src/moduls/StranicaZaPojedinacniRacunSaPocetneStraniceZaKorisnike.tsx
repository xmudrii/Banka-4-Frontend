import React, { useState, useEffect } from 'react';

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
        <h3>Podaci:</h3>
        <table style={{ borderCollapse: 'collapse', border: '1px solid #ddd', width: '100%' }}>
          <tbody>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Broj računa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.accountNumber*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Stanje:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.balance*/}</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Raspoloživo stanje:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.availableBalance*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Datum kad je račun kreiran:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.dateCreated*/}</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Datum kad račun ističe:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.expiryDate*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Valuta računa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.currency*/}</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Vrsta računa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.accountType*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Status računa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.accountStatus*/}</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Kamatna stopa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.interestRate || "N/A"*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Cena održavanja računa:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.accountMaintenancePrice || "N/A"*/}</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mejl korisnika:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.userEmail*/}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mejl zaposlenog:</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{/*data.employeeEmail*/}</td>
            </tr>
          </tbody>
        </table>


        <h3>Podaci o transakciji:</h3>
      <table style={{ borderCollapse: 'collapse', border: '1px solid #ddd', width: '80%', margin: 'auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Naziv primaoca</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Broj računa primaoca</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Iznos</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Poziv na broj</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Datum i vreme transakcije</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Primalac 1</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>123456789</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>1000</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>123456</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Uspeh</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-03-10 14:30:00</td>
            </tr>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Primalac 2</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>987654321</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>500</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>654321</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>U obradi</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-03-10 15:45:00</td>
            </tr>
            {/* Dodajte dodatne redove za ostale transakcije */}
        </tbody>
      </table>
      
      </div>
    </div>
  );
  
  
}

export default DataFetchingPage;
