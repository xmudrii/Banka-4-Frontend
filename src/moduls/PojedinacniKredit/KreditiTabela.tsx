import React from 'react';
import { KreditPojedinacni } from '../../utils/types';

const KreditiTabela = ({ kredit }: { kredit: KreditPojedinacni }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Naziv kredita</th>
          <th>Broj kredita</th>
          <th>Iznos kredita</th>
          <th>Period otplate</th>
          <th>Nominalna kamatna stopa</th>
          <th>Efektivna kamatna stopa</th>
          <th>Datum ugovaranja</th>
          <th>Datum dospeća kredita</th>
          <th>Iznos rate</th>
          <th>Datum sledeće rate</th>
          <th>Preostalo dugovanje</th>
          <th>Iznos pretplate/dugovanja</th>
          <th>Valuta kredita</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{kredit.naziv}</td>
          <td>{kredit.broj}</td>
          <td>{kredit.iznos}</td>
          <td>{kredit.period}</td>
          <td>{kredit.nominalnaKamatnaStopa}</td>
          <td>{kredit.efektivnaKamatnaStopa}</td>
          <td>{kredit.datumUgovaranja}</td>
          <td>{kredit.datumDospeca}</td>
          <td>{kredit.iznosRate}</td>
          <td>{kredit.datumSledeceRate}</td>
          <td>{kredit.preostaloDugovanje}</td>
          <td>{kredit.iznosPretplate}</td>
          <td>{kredit.valuta}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default KreditiTabela;
