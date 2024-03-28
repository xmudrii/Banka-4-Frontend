import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";
import { makeGetRequest } from "../utils/apiRequest";
import { getMe } from "../utils/getMe";
import { Account, User } from "../utils/types";
import { Container } from "@mui/material";

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
    <Container className="main-div">
      {detaljiTransfera ? (
        <Container>
          <TransferDetails
            user={user}
            setDetaljiTransfera={setDetaljiTransfera}
            iznos={iznos}
            saRacuna={saRacuna}
            naRacun={naRacun}
          />
        </Container>
      ) : (
        <Container>
          <ExchangeMainSection
            setNaRacun={setNaRacun}
            setSaRacuna={setSaRacuna}
            setDetaljiTransfera={setDetaljiTransfera}
            setIznos={setIznos}
          />
        </Container>
      )}
      <Container className="table-div">
        <ExchangeRatesTable />
      </Container>
    </Container>
  );
};
export default ExchangePage;
