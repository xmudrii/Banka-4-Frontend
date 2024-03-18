import { ExchangeRate } from "./Model";

const ExchangeRatesTable = () => {
  const exchangeRateList: ExchangeRate[] = [
    {
      valuta: "EUR",
      kupovni: 117.5,
      prodajni: 119.5,
    },
    {
      valuta: "USD",
      kupovni: 99.2,
      prodajni: 101.0,
    },
    {
      valuta: "GBP",
      kupovni: 135.8,
      prodajni: 138.2,
    },
    {
      valuta: "CHF",
      kupovni: 107.5,
      prodajni: 109.0,
    },
    {
      valuta: "RSD",
      kupovni: 1.0,
      prodajni: 1.0,
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
            <tr key={exchangeRate.valuta}>
              <td>{exchangeRate.valuta}</td>
              <td>{exchangeRate.kupovni}</td>
              <td>{exchangeRate.prodajni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExchangeRatesTable;
