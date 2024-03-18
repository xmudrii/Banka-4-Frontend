import React from 'react';
import { Transakcija } from '../../utils/types';


const TransakcijeTabela = ({ transakcije }: { transakcije: Transakcija[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Naziv primaoca</th>
          <th>Broj računa primaoca</th>
          <th>Iznos</th>
          <th>Poziv na broj</th>
          <th>Status</th>
          <th>Vreme transakcije</th>
          <th>Šifra plaćanja</th>
          <th>Svrha plaćanja</th>
          <th>Vreme izvršavanja</th>
        </tr>
      </thead>
      <tbody>
        {transakcije.map((transakcija, index) => (
          <tr key={index}>
            <td>{transakcija.nazivPrimaoca}</td>
            <td>{transakcija.racunPrimaoca}</td>
            <td>{transakcija.iznos}</td>
            <td>{transakcija.pozivNaBroj}</td>
            <td>{transakcija.status}</td>
            <td>{transakcija.vremeTransakcije}</td>
            <td>{transakcija.sifraPlacanja}</td>
            <td>{transakcija.svrhaPlacanja}</td>
            <td>{transakcija.vremeIzvrsavanja}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransakcijeTabela;
