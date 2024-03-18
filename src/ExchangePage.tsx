import { useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";

const ExchangePage = () => {
  const [iznos, setIznos] = useState<number>();
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);
  return (
    <main className="main-div">
      {detaljiTransfera ? (
        <div>
          <TransferDetails setDetaljiTransfera={setDetaljiTransfera} />
        </div>
      ) : (
        <div>
          <ExchangeMainSection setDetaljiTransfera={setDetaljiTransfera} />
        </div>
      )}
      <section className="table-div">
        <ExchangeRatesTable />
      </section>
    </main>
  );
};
export default ExchangePage;
