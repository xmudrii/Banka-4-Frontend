import { ExchangeRate } from "./Model";
import "./Table.css";

const ExchangeRatesTable = () => {
  const exchangeRateList: ExchangeRate[] = [
    {
      par: "EUR-USD",
      kurs: 1.184,
    },
    {
      par: "EUR-GBP",
      kurs: 0.855,
    },
    {
      par: "EUR-CHF",
      kurs: 1.093,
    },
    {
      par: "EUR-RSD",
      kurs: 117.5,
    },
  ];
  return (
    <div>
      <p>Kursna lista</p>
      <table>
        <thead>
          <tr>
            <th>Par</th>
            <th>Kurs</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRateList.map((exchangeRate) => (
            <tr key={exchangeRate.par}>
              <td>{exchangeRate.par}</td>
              <td>{exchangeRate.kurs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExchangeRatesTable;
