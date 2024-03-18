import ".//ExchangePage.css";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
};

const TransferDetails = ({ setDetaljiTransfera }: Props) => {
  return (
    <article className="main-section-details-div">
      <section className="details-section">
        <p>Platilac:</p>
        <p className="platilac">PETAR PETROVIC, ADRESA</p>
      </section>
      <section className="details-section">
        <p>Sa racuna:</p>
        <p>102-39443942389</p>
      </section>
      <section className="details-section">
        <p>Iznos:</p>
        <p>1,00 EUR</p>
      </section>
      <section className="details-section">
        <p>Na racun:</p>
        <p>102-394438340549</p>
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
      {/* <section className=""></section> */}
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
