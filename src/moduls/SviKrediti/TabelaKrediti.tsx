import React from 'react';
import { Kredit } from './../../utils/types';

interface TabelaProps {
    krediti: Kredit[];
    onClickRed: (kredit: Kredit) => void;
}

const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Vrsta kredita</th>
                    <th>Iznos kredita</th>
                    <th>Svrha kredita</th>
                    <th>Iznos mesečne plate</th>
                    <th>Zaposlen za stalno</th>
                    <th>Period zaposlenja kod trenutnog poslodavca</th>
                    <th>Ročnost</th>
                    <th>Ekspozitura</th>
                    <th>Broj mobilnog telefona</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {krediti.map((kredit, index) => (
                    <tr key={index} onClick={() => onClickRed(kredit)}>
                        <td>{kredit.VrstaKredita}</td>
                        <td>{kredit.IznosKredita}</td>
                        <td>{kredit.SvrhaKredita}</td>
                        <td>{kredit.IznosMesecnePlate}</td>
                        <td>{kredit.ZaposlenZaStalno}</td>
                        <td>{kredit.PeriodZaposlenja}</td>
                        <td>{kredit.Rocnost}</td>
                        <td>{kredit.Ekspozitura}</td>
                        <td>{kredit.BrojMobilnogTelefona}</td>
                        <td>{kredit.Status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
