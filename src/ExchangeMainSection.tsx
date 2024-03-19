import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "./utils/getMe";
import { makeGetRequest } from "./utils/apiRequest";
import { Account } from "./Model";

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

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const me = getMe();
      if (!me) return;
      const data = await makeGetRequest(
        `/racuni/nadjiRacuneKorisnika/${me.id}`
      );
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <article className="main-section-div">
      <section className="iznos-div">
        <label>Iznos:</label>
        <textarea
          rows={1}
          name={"iznos"}
          className="textarea"
          placeholder={"Upisite iznos..."}
          required={true}
          onChange={(e) => setIznos(e.target.value)}
        />
      </section>
      <section className="sa-racuna-div">
        <label>Sa racuna: </label>
        <select className="custom-select" defaultValue={"Broj racuna..."}>
          <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
          {accounts.map((account) => (
            <option
              value={account.brojRacuna}
              onChange={() => setSaRacuna(account)}
            >
              {account.brojRacuna}, {account.currency}
            </option>
          ))}
        </select>
      </section>
      <section className="na-racun-div">
        <label>Na racun: </label>
        <select className="custom-select">
          <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
          {accounts.map((account) => (
            <option
              value={account.brojRacuna}
              onChange={() => setNaRacun(account)}
            >
              {account.brojRacuna}, {account.currency}
            </option>
          ))}
        </select>
      </section>
      <section className="kurs-div">
        <label>Trenutni kurs izmedju: valute1 i valute2: 117.5 </label>
      </section>
      <section className="buttons">
        <button className="button">Odustani</button>
        <button className="button" onClick={() => setDetaljiTransfera(true)}>
          Nastavi
        </button>
      </section>
    </article>
  );
};
export default ExchangeMainSection;
