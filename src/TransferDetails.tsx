import ".//ExchangePage.css";
import { Account } from "./Model";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;
  saRacuna: Account | undefined;
  naRacun: Account | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
  saRacuna,
  naRacun,
}: Props) => {
  return (
    <article className="main-section-details-div">
      <section className="details-section">
        <p>Platilac:</p>
        <p className="platilac">PETAR PETROVIC, ADRESA</p>
      </section>
      <section className="details-section">
        <p>Sa racuna:</p>
        <p>{saRacuna?.brojRacuna}</p>
      </section>
      <section className="details-section">
        <p>Iznos:</p>
        <p>{iznos}</p>
      </section>
      <section className="details-section">
        <p>Na racun:</p>
        <p>{naRacun?.brojRacuna}</p>
      </section>
      <section className="details-section">
        <p>Iznos:</p>
        <p>117,69 RSD</p>
      </section>
      <section className="details-section">
        <p>Kurs:</p>
        <p>117,6926</p>
      </section>
      <section className="details-section">
        <p>Provizija:</p>
        <p>0.00 RSD</p>
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
