import { useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";
import { Account } from "./Model";

const ExchangePage = () => {
  const [iznos, setIznos] = useState<string>();
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);
  const [saRacuna, setSaRacuna] = useState<Account>();
  const [naRacun, setNaRacun] = useState<Account>();

  return (
    <main className="main-div">
      {detaljiTransfera ? (
        <div>
          <TransferDetails
            setDetaljiTransfera={setDetaljiTransfera}
            iznos={iznos}
            saRacuna={saRacuna}
            naRacun={naRacun}
          />
        </div>
      ) : (
        <div>
          <ExchangeMainSection
            setNaRacun={setNaRacun}
            setSaRacuna={setSaRacuna}
            setDetaljiTransfera={setDetaljiTransfera}
            setIznos={setIznos}
          />
        </div>
      )}
      <section className="table-div">
        <ExchangeRatesTable />
      </section>
    </main>
  );
};
export default ExchangePage;
