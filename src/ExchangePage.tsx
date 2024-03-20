import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";
import { Account } from "./Model";
import { makeGetRequest } from "./utils/apiRequest";
import { getMe } from "./utils/getMe";
import { User } from "./utils/types";

const ExchangePage = () => {
  const [iznos, setIznos] = useState<string>();
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);
  const [saRacuna, setSaRacuna] = useState<Account>();
  const [naRacun, setNaRacun] = useState<Account>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(`/korisnik/email/${user.sub}`);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="main-div">
      {detaljiTransfera ? (
        <div>
          <TransferDetails
            user={user}
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
