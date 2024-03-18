import React, { useState } from 'react';

interface FormData {
  vrstaKredita: string;
  iznosKredita: string;
  svrhaKredita: string;
  iznosMesecnePlate: string;
  zaposlenZaStalno: boolean;
  periodZaposlenja: string;
  rocnost: string;
  ekspozitura: string;
}

const TraziKreditStranica: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vrstaKredita: '',
    iznosKredita: '',
    svrhaKredita: '',
    iznosMesecnePlate: '',
    zaposlenZaStalno: false,
    periodZaposlenja: '',
    rocnost: '',
    ekspozitura: '',
  });
  const [loading, setLoading] = useState(false);
  const [poruka, setPoruka] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePosalji = async () => {
    setLoading(true);
    // Simulacija slanja zahteva na server
    const response = await fetch('http://api.stamenic.work:8080/api/kredit/TraziKredit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setLoading(false);
    setPoruka(data.message); // Prikazivanje poruke na stranici
  };

  return (
    <div>
      <h2>Forma za traženje kredita</h2>
      {poruka && <p>{poruka}</p>}
      <label>
        Vrsta kredita:
        <select name="vrstaKredita" value={formData.vrstaKredita} onChange={handleChange}>
          <option value="gotovinski">Gotovinski</option>
          <option value="stambeni">Stambeni</option>
          <option value="auto">Auto</option>
          <option value="refinansirajuci">Refinansirajući</option>
        </select>
      </label>
      <br />
      {/* Ostatak forme */}
      <button onClick={handlePosalji} disabled={loading}>Pošalji</button>
    </div>
  );
};

export default TraziKreditStranica;
