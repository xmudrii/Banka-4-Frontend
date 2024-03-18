import { ExchangeRate } from "./Model";
import "./Table.css";

const ExchangeRatesTable = () => {
  const exchangeRateList: ExchangeRate[] = [
    {
      par: "EUR-USD",
      kurs: 1.184,
      poslednjaIzmena: new Date(),
    },
    {
      par: "EUR-GBP",
      kurs: 0.855,
      poslednjaIzmena: new Date(),
    },
    {
      par: "EUR-CHF",
      kurs: 1.093,
      poslednjaIzmena: new Date(),
    },
    {
      par: "EUR-RSD",
      kurs: 117.5,
      poslednjaIzmena: new Date(),
    },
  ];
  return (
    <div>
      <p>Kursna lista</p>
      <table>
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kupovni</th>
            <th>Prodajni</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRateList.map((exchangeRate) => (
            <tr key={exchangeRate.par}>
              <td>{exchangeRate.par}</td>
              <td>{exchangeRate.kurs}</td>
              <td>{exchangeRate.poslednjaIzmena.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExchangeRatesTable;
