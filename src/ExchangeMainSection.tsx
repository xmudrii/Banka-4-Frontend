import { useState } from "react";
import ".//ExchangePage.css";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
};

const ExchangeMainSection = ({ setDetaljiTransfera }: Props) => {
  const [iznos, setIznos] = useState<number>();

  return (
    <article className="main-section-div">
      <section className="iznos-div">
        <label>Iznos:</label>
        <textarea
          rows={1}
          name={"iznos"}
          className="textarea"
          placeholder={"Upisite iznos..."}
          value={iznos}
          required={true}
        />
      </section>
      <section className="sa-racuna-div">
        <label>Sa racuna: </label>
        <select className="custom-select" defaultValue={"Broj racuna..."}>
          <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
        </select>
      </section>
      <section className="na-racun-div">
        <label>Na racun: </label>
        <select className="custom-select">
          <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
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
