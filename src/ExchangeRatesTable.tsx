import { useEffect, useState } from "react";
import { ExchangeRate } from "./Model";
import "./Table.css";
import { makeGetRequest } from "./utils/apiRequest";

const ExchangeRatesTable = () => {
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);

  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/api/exchange`);
      if (data) {
        setExhanges(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <div>
      <p>Kursna lista</p>
      <table>
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kurs</th>
          </tr>
        </thead>
        <tbody>
          {exchages.map((exchage) => (
            <tr key={exchage.currencyCode}>
              <td>{exchage.currencyCode}</td>
              <td>{exchage.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExchangeRatesTable;
