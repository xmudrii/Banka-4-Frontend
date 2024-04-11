import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { makeApiRequest } from 'utils/apiRequest';
import { BankRoutes } from 'utils/types';
import { Kredit } from 'utils/types';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../utils/getMe';
import { makeGetRequest } from "utils/apiRequest";

const TraziKreditStranica: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Kredit>({
    id: 0,
    type: '',
    amount: '',
    salary: '',
    currentEmploymentPeriod: '',
    loanTerm: '',
    branchOffice: '',
    bankAccountNumber: '',
    loanPurpose: '',
    permanentEmployee: false,
    status: '',
  });

  const [bankAccountNumbers, setBankAccountNumbers] = useState<string[]>([]);


  const [loading, setLoading] = useState(false);
  const [poruka, setPoruka] = useState<string>('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const me = getMe();
        if (!me)
          return;
        const data = await makeGetRequest(`${BankRoutes.account_find_user_account}/${me.id}`)
        if (data) {
          console.log(data);
          let racuni: string[] = [];
          for (const key in data) {
            let racun = data[key].brojRacuna;
            console.log(racun);
            racuni.push(racun);
          }
          console.log(racuni.length);
          setBankAccountNumbers(racuni); // Postavljanje stanja bankAccountNumbers
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAccounts(); // Pozivamo funkciju odmah nakon definisanja
  }, []);
  

  


    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; checked?: boolean | undefined; }>) => {
    const { name, value, checked } = e.target;
    let parsedValue: string | number | boolean | '';
    setPoruka(``);
    if (name === 'cccurrentEmploymentPeriod') {
      const trimmedValue = (value as string).trim();
      if (trimmedValue === '' || isNaN(parseInt(trimmedValue, 10))) {
        parsedValue = '';
      } else {
        parsedValue = parseInt(trimmedValue, 10);
      }
    } else {
      parsedValue = name === 'zaposlenZaStalno' && checked !== undefined ? checked : (value as string);
    }
  
    //validacija 
    if (name === 'currentEmploymentPeriod' || name === 'salary' || name === 'loanTerm' || name === 'bankAccountNumber' || name === 'amount') {
      const trimmedValue = (value as string).trim();
      if (trimmedValue === '' || isNaN(parseFloat(trimmedValue))) {
        setPoruka(`Polje ${name} mora da bude broj`);
        parsedValue = '';
      } else {
        parsedValue = parseFloat(trimmedValue);
        
      }
    } else {
      parsedValue = name === 'permanentEmployee' && checked !== undefined ? checked : (value as string);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name as string]: name === 'zaposlenZaStalno' && checked !== undefined ? checked : parsedValue,
    }));
  };
  
  const handleChange2 = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setPoruka(``);
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handlePosalji = async () => {
    setLoading(true);
    // Simulacija slanja zahteva na server
  
    formData.status = "Salje se";
    const allFieldsValid = Object.values(formData).every(value => value !== '');

    if (!allFieldsValid) {
      setLoading(false);
      setPoruka("Molimo popunite sva polja");
      return;
    }


    const data = await makeApiRequest(BankRoutes.credit_apply, "POST", formData, false, true);
    setLoading(false);
  
    if (data && data.status && data.status === 200) {
      navigate(-1)
      setPoruka("USPESNO POSLATO"); // Prikazivanje poruke na stranici
    } else {
      setPoruka("GRESKA PRI SLANJU"); // Prikazivanje poruke na stranici
    }
  
    console.log(data);
    // Ispisivanje trenutnog stanja forme u konzoli
    console.log(formData);
  };
  

  return (
    <div>
      <h2>Forma za traženje kredita</h2>
      <FormControl>
        <InputLabel id="vrstaKredita-label">Vrsta kredita</InputLabel>
        <Select
          labelId="vrstaKredita-label"
          id="vrstaKredita"
          name="type" // Ime polja u formData
          value={formData.type}
          onChange={handleChange2}
        >
          <MenuItem value="gotovinski">Gotovinski</MenuItem>
          <MenuItem value="stambeni">Stambeni</MenuItem>
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="refinansirajuci">Refinansirajući</MenuItem>
        </Select>
      </FormControl>
      <br />
     
      <TextField
        label="Iznos kredita"

        name="amount" // Ispravljeno ime polja
        value={formData.amount}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Svrha kredita"
        name="loanPurpose" // Ispravljeno ime polja
        value={formData.loanPurpose}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Iznos mesečne plate"
        name="salary" // Ispravljeno ime polja
        value={formData.salary}
        onChange={handleChange}
      />
      <br />
      <FormControlLabel
        control={<Checkbox
          checked={formData.permanentEmployee}
          onChange={(e) => setFormData((prevData) => ({ ...prevData, permanentEmployee: e.target.checked }))}
          name="permanentEmployee" // Ispravljeno ime polja
        />}
        label="Zaposlen za stalno"
      />
      <br />
      <TextField
        label="Period zaposlenja"
        name="currentEmploymentPeriod" // Ispravljeno ime polja
        type="text"
        value={formData.currentEmploymentPeriod}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Rok otplate (u mesecima)"
        type="text"
        name="loanTerm" // Ispravljeno ime polja
        value={formData.loanTerm}
        onChange={handleChange}
      />
      <br />
      <FormControl>
        <InputLabel id="bankAccountNumber-label">Broj Bankovnog racuna</InputLabel>
        <Select
          labelId="bankAccountNumber-label"
          id="bankAccountNumber"
          name="bankAccountNumber"
          value={formData.bankAccountNumber}
          onChange={handleChange2}
        >
          {bankAccountNumbers?.map((number, index) => (
            <MenuItem key={index} value={number}>{number}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        label="Ekspozitura"
        name="branchOffice" // Ispravljeno ime polja
        value={formData.branchOffice}
        onChange={handleChange}
      />
       {poruka && <p>{poruka}</p>}
      <br />
      <Button variant="contained" onClick={handlePosalji} disabled={loading}>Pošalji</Button>
    </div>
  );
};

export default TraziKreditStranica;
