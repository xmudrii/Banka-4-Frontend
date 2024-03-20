import ".//ExchangePage.css";
import { Account } from "./Model";
import { User } from "./utils/types";

const provizija = 0.005;
const kurs = 117.6926;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;
  saRacuna: Account | undefined;
  naRacun: Account | undefined;
  user: User | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
  saRacuna,
  naRacun,
  user,
}: Props) => {
  return (
    <article className="main-section-details-div">
      <section className="details-section">
        <p>Platilac:</p>
        <p className="platilac">
          {user?.ime} {user?.prezime}, {user?.adresa}
        </p>
      </section>
      <section className="details-section">
        <p>Sa racuna:</p>
        <p>{saRacuna?.brojRacuna}</p>
      </section>
      <section className="details-section">
        <p>Iznos:</p>
        <p>
          {iznos} {saRacuna?.currency}
        </p>
      </section>
      <section className="details-section">
        <p>Na racun:</p>
        <p>{naRacun?.brojRacuna}</p>
      </section>
      <section className="details-section">
        <p>Iznos:</p>
        <p>
          {iznos && parseInt(iznos, 10) * kurs} {naRacun?.currency}
        </p>
      </section>
      <section className="details-section">
        <p>Kurs:</p>
        <p>{kurs}</p>
      </section>
      <section className="details-section">
        <p>Provizija:</p>
        <p>{provizija}</p>
      </section>
      <section className="buttons">
        <button className="button" onClick={() => setDetaljiTransfera(false)}>
          Ponisti
        </button>
        <button className="button">Potvrdi</button>
      </section>
    </article>
  );
};
export default TransferDetails;
