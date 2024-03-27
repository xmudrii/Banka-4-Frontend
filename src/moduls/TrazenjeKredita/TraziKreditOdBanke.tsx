import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { makeApiRequest } from 'utils/apiRequest';

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

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePosalji = async () => {
    setLoading(true);
    // Simulacija slanja zahteva na server
    const data = await makeApiRequest('/kredit/TraziKredit', "POST", formData)
    setLoading(false);
    setPoruka(data.message); // Prikazivanje poruke na stranici
  };

  return (
    <div>
      <h2>Forma za traženje kredita</h2>
      {poruka && <p>{poruka}</p>}
      <FormControl>
        <InputLabel id="vrstaKredita-label">Vrsta kredita</InputLabel>
        <Select
          labelId="vrstaKredita-label"
          id="vrstaKredita"
          name="vrstaKredita"
          value={formData.vrstaKredita}
          onChange={handleChange}
        >
          <MenuItem value="gotovinski">Gotovinski</MenuItem>
          <MenuItem value="stambeni">Stambeni</MenuItem>
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="refinansirajuci">Refinansirajući</MenuItem>
        </Select>
      </FormControl>
      <br />
      {/* Ostatak forme */}
      <Button variant="contained" onClick={handlePosalji} disabled={loading}>Pošalji</Button>
    </div>
  );
};

export default TraziKreditStranica;
