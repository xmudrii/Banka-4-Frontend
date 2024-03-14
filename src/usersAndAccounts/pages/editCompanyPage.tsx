import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`
const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px;
    border-radius: 18px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeadingText = styled.div`
  font-size: 32px;
`

const StyledButton = styled(Button)`
  max-width: 100px ;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTextField = styled(TextField)`
  background-color: white;
`


interface createCompanyData {
  naziv: string;
  brojTelefona: string;
  brojFaksa: string;
  pib: string;
  maticniBroj: string;
  sifraDelatnosti: string;
  registarskiBroj: string;

}

const EditCompanyPage: React.FC = () => {
  const [formData, setFormData] = useState<createCompanyData>({
    naziv: '',
    brojTelefona: '',
    brojFaksa: '',
    pib: '',
    maticniBroj: '',
    sifraDelatnosti: '',
    registarskiBroj: '',
  });

  const [fieldWarning, setFieldWarning] = useState<string>('');

  // const navigate = useNavigate();

  const handleSumbit = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === '') {
        setFieldWarning(key);
        return;
      }
    }

    // const numbersOnlyRegex = /\d{13}/
    // if (!(numbersOnlyRegex.test(formData.jmbg))) {
    //   setNumbersOnlyWarning(true)
    // } else {
    //   setNumbersOnlyWarning(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  return (
    <PageWrapper>
      <HeadingText>
        Izmena firme
      </HeadingText>
      <FormWrapper>
        <StyledTextField
          label="Naziv"
          name='naziv'
          variant="outlined"
          value={formData.naziv}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Broj telefona"
          name='brojTelefona'
          variant="outlined"
          value={formData.brojTelefona}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Broj faksa"
          name='brojFaksa'
          variant="outlined"
          value={formData.brojFaksa}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Pib"
          name='pib'
          variant="outlined"
          value={formData.pib}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Maticni broj"
          name='maticniBroj'
          variant="outlined"
          value={formData.maticniBroj}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Sifra delatnosti"
          name='sifraDelatnosti'
          variant="outlined"
          value={formData.sifraDelatnosti}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Registarski broj"
          name='registarskiBroj'
          variant="outlined"
          value={formData.registarskiBroj}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Azuriraj
          </StyledButton>
        </ButtonContainer>

      </FormWrapper>
      {fieldWarning !== "" && <Alert severity="error">Popunite polje '{fieldWarning}' .</Alert>}
    </PageWrapper>
  );
};

export default EditCompanyPage;
