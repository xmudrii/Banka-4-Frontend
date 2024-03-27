import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "../utils/getMe";
import { makeGetRequest } from "../utils/apiRequest";
import { Account, ExchangeRate } from "utils/types";
import { Button, Container, FormControl, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  setIznos: (iznos: string) => void;
  setSaRacuna: (saRacuna: Account) => void;
  setNaRacun: (naRacun: Account) => void;
};

const ExchangeMainSection = ({
  setDetaljiTransfera,
  setIznos,
  setSaRacuna,
  setNaRacun,
}: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [iznosError, setIznosError] = useState<boolean>(false);
  const [saRacuna2, setSaRacuna2] = useState<Account>();
  const [naRacun2, setNaRacun2] = useState<Account>();
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    fetchAccounts();
    fetchExchange();
  }, []);

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

  const fetchAccounts = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(
        `/racuni/nadjiRacuneKorisnika/${user.id}`
      );
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findExchangeRate = (
    currency1: string | undefined,
    currency2: string | undefined
  ) => {
    if (!currency1 || !currency2) return null;

    const rate1 = exchages.find(
      (exchage) => exchage.currencyCode === currency1
    )?.rate;

    const rate2 = exchages.find(
      (exchage) => exchage.currencyCode === currency2
    )?.rate;

    if (rate1 && rate2) {
      return rate1 / rate2;
    } else {
      return null;
    }
  };

  return (
    <Container>
      <FormControl
        className="main-section-div"
        onSubmit={(e) => {
          e.preventDefault();
          setDetaljiTransfera(true);
        }}
      >
        <Paper className="iznos-div">
          <Typography>Iznos:</Typography>
          <TextField
            rows={1}
            name={"iznos"}
            className="textarea"
            placeholder={"Upisite iznos..."}
            required={true}
            onChange={(e) => {
              setIznos(e.target.value);
              setIznosError(false);
            }}
          />
          {iznosError && <Typography className="error-text">Iznos je obavezan.</Typography>}
        </Paper>
        <Paper className="sa-racuna-div">
          <Typography>Sa racuna: </Typography>
          <Select className="custom-select" defaultValue={"Broj racuna..."}>
            <MenuItem defaultValue={"Broj racuna..."}>Broj racuna...</MenuItem>
            {accounts.map((account) => (
              <MenuItem
                value={account.brojRacuna}
                onChange={() => {
                  setSaRacuna(account);
                  setSaRacuna2(account);
                }}
              >
                {account.brojRacuna}, {account.currency}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <Paper className="na-racun-div">
          <Typography>Na racun: </Typography>
          <Select className="custom-select">
            <MenuItem defaultValue={"Broj racuna..."}>Broj racuna...</MenuItem>
            {accounts.map((account) => (
              <MenuItem
                value={account.brojRacuna}
                onChange={() => {
                  setNaRacun(account);
                  setNaRacun2(account);
                }}
              >
                {account.brojRacuna}, {account.currency}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <Paper className="kurs-div">
          <Typography>
            Trenutni kurs izmedju: {saRacuna2?.currency} i {naRacun2?.currency}:{" "}
            {findExchangeRate(saRacuna2?.currency, naRacun2?.currency)}
          </Typography>
        </Paper>
        <Paper className="buttons">
          <Button className="button">Odustani</Button>
          <Button type="submit" className="button">
            Nastavi
          </Button>
        </Paper>
      </FormControl>
    </Container>
  );
};
export default ExchangeMainSection;
