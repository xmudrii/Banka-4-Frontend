import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
// @ts-ignore
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

// @ts-ignore
const validateEmail = (email) => {
    // Simple email validation pattern
    return /\S+@\S+\.\S+/.test(email);
};



const RegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        ime: '',
        prezime: '',
        jmbg: '',
        datumRodjenja: '',
        pol: '',
        adresa: '',
        email: '',
        telefon: '',
        brojRacuna: '',
        aktivacioniKod: '',
        lozinka: '',
        ponovljenaLozinka: '',
    });
    const [errors, setErrors] = useState({});

    // Add validation and step change logic here
    const handleNextStep = () => {
        if (currentStep === 1 && validateFieldsStepOne()) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2 && validateFieldsStepTwo()) {
            setCurrentStep(currentStep + 1);
        }
        // You can add more else if blocks for further steps if needed
    };


    const handleGenerateCode = () => {
        // Placeholder for generating the activation code
        // In a real application, you would call your backend API to send the activation code to the user
        console.log("Generating activation code...");
        // Simulate setting a received code (this would typically be done via email or SMS)
        setUserData({ ...userData, aktivacioniKod: '123456' }); // Example code
    };

    const validateFieldsStepOne = () => {
        let newErrors = {};
        // Text fields without numbers
        if (!/^[a-zA-Z]+$/.test(userData.ime)) {
            newErrors = { ...newErrors, ime: 'Ime može sadržati samo slova.' };
        }
        if (!/^[a-zA-Z]+$/.test(userData.prezime)) {
            newErrors = { ...newErrors, prezime: 'Prezime može sadržati samo slova.' };
        }
        // JMBG validation
        if (userData.jmbg.length !== 13 || !/^\d+$/.test(userData.jmbg)) {
            newErrors = { ...newErrors, jmbg: 'JMBG mora imati 13 cifara.' };
        }
        // Email validation
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors = { ...newErrors, email: 'Neispravna email adresa.' };
        }
        // Phone validation
        if (!/^\+?\d+$/.test(userData.telefon)) {
            newErrors = { ...newErrors, telefon: 'Telefon može sadržati samo brojeve i opcionalno + na početku.' };
        }
        // Account number validation
        if (userData.brojRacuna.length !== 18 || !/^\d+$/.test(userData.brojRacuna)) {
            newErrors = { ...newErrors, brojRacuna: 'Broj računa mora imati 18 cifara.' };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateFieldsStepTwo = () => {
        let newErrors = {};
        // Activation code validation
        if (!userData.aktivacioniKod || userData.aktivacioniKod.length === 0) {
            newErrors = { ...newErrors, aktivacioniKod: 'Aktivacioni kod je obavezan.' };
        }
        // In a real application, you might also want to verify the code's correctness here by calling the backend

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateFieldsStepThree = () => {
        let newErrors = {};
        // Password validation
        if (!userData.lozinka || userData.lozinka.length < 6) {
            newErrors = { ...newErrors, lozinka: 'Lozinka mora imati najmanje 6 karaktera.' };
        }
        if (userData.lozinka !== userData.ponovljenaLozinka) {
            newErrors = { ...newErrors, ponovljenaLozinka: 'Lozinke se ne poklapaju.' };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = () => {
        // This would be a good place to validate all fields across all steps
        if (validateFieldsStepOne() && validateFieldsStepTwo() && validateFieldsStepThree()) {
            // In a real application, you'd make an API call to your backend to register the user
            console.log("Registering user with data:", userData);
            // Redirect the user or show a success message
        }
    };

    // @ts-ignore
    const handleFieldChange = (field, value) => {
        // Apply transformations like capitalization for names here if necessary
        if (field === 'ime' || field === 'prezime') {
            value = capitalizeFirstLetter(value);
        }
        if (field === 'jmbg' && value.length !== 13) {
            setErrors({ ...errors, jmbg: 'JMBG mora imati 13 cifara.' });
        } else if (field === 'email' && !validateEmail(value)) {
            setErrors({ ...errors, email: 'Email adresa nije validna.' });
        } else {
            let newErrors = { ...errors };
            // @ts-ignore
            delete newErrors[field];
            setErrors(newErrors);
        }

        setUserData({ ...userData, [field]: value });
        // Add field-specific validation logic here, updating the `errors` state as needed
    };


    if (currentStep === 1) {
        return (
            <Container component="main" maxWidth="sm">
                <Typography component="h1" variant="h5">Registracija korisnika - Korak 1</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="ime"
                        label="Ime"
                        name="ime"
                        autoComplete="given-name"
                        value={userData.ime}
                        onChange={(e) => handleFieldChange('ime', e.target.value)}
                        // @ts-ignore
                        error={!!errors.ime}
                        // @ts-ignore
                        helperText={errors.ime}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="prezime"
                        label="Prezime"
                        name="prezime"
                        autoComplete="family-name"
                        value={userData.prezime}
                        onChange={(e) => handleFieldChange('prezime', e.target.value)}
                        // @ts-ignore
                        error={!!errors.prezime}
                        // @ts-ignore
                        helperText={errors.prezime}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="jmbg"
                        label="JMBG"
                        name="jmbg"
                        autoComplete="jmbg"
                        value={userData.jmbg}
                        onChange={(e) => handleFieldChange('jmbg', e.target.value)}
                        // @ts-ignore
                        error={!!errors.jmbg}
                        // @ts-ignore
                        helperText={errors.jmbg}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="datumRodjenja"
                        label="Datum rođenja"
                        name="datumRodjenja"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={userData.datumRodjenja}
                        onChange={(e) => handleFieldChange('datumRodjenja', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="pol-label">Pol</InputLabel>
                        <Select
                            labelId="pol-label"
                            id="pol"
                            value={userData.pol}
                            label="Pol"
                            onChange={(e) => handleFieldChange('pol', e.target.value)}
                        >
                            <MenuItem value={'M'}>Muški</MenuItem>
                            <MenuItem value={'Ž'}>Ženski</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        fullWidth
                        id="adresa"
                        label="Adresa stanovanja"
                        name="adresa"
                        autoComplete="address"
                        value={userData.adresa}
                        onChange={(e) => handleFieldChange('adresa', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email adresa"
                        name="email"
                        autoComplete="email"
                        value={userData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        // @ts-ignore
                        error={!!errors.email}
                        // @ts-ignore
                        helperText={errors.email}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="telefon"
                        label="Broj telefona"
                        name="telefon"
                        autoComplete="tel"
                        value={userData.telefon}
                        onChange={(e) => handleFieldChange('telefon', e.target.value)}
                        // @ts-ignore
                        error={!!errors.telefon}
                        // @ts-ignore
                        helperText={errors.telefon}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="brojRacuna"
                        label="Broj računa"
                        name="brojRacuna"
                        autoComplete="bank-account"
                        value={userData.brojRacuna}
                        onChange={(e) => handleFieldChange('brojRacuna', e.target.value)}
                        // @ts-ignore
                        error={!!errors.brojRacuna}
                        // @ts-ignore
                        helperText={errors.brojRacuna}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleNextStep} fullWidth sx={{ mt: 3, mb: 2 }}>
                        Nastavi
                    </Button>
                </Box>
            </Container>
        );
    } else if (currentStep === 2) {
        return (
            <Container component="main" maxWidth="sm">
                <Typography component="h1" variant="h5">Registracija korisnika - Korak 2</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="aktivacioniKod"
                        label="Aktivacioni kod"
                        name="aktivacioniKod"
                        value={userData.aktivacioniKod}
                        onChange={(e) => handleFieldChange('aktivacioniKod', e.target.value)}
                        // @ts-ignore
                        error={!!errors.aktivacioniKod}
                        // @ts-ignore
                        helperText={errors.aktivacioniKod || "Unesite kod koji ste dobili."}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleGenerateCode} sx={{ mt: 1, mb: 2 }}>
                        Generiši kod
                    </Button>
                    <Button variant="contained" onClick={handleNextStep} fullWidth sx={{ mt: 3, mb: 2 }}>
                        Nastavi
                    </Button>
                </Box>
            </Container>
        );
    } else if (currentStep === 3) {
        return (
            <Container component="main" maxWidth="sm">
                <Typography component="h1" variant="h5">Registracija korisnika - Korak 3</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="lozinka"
                        label="Lozinka"
                        name="lozinka"
                        type="password"
                        value={userData.lozinka}
                        onChange={(e) => handleFieldChange('lozinka', e.target.value)}
                        // @ts-ignore
                        error={!!errors.lozinka}
                        // @ts-ignore
                        helperText={errors.lozinka}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="ponovljenaLozinka"
                        label="Ponovi lozinku"
                        name="ponovljenaLozinka"
                        type="password"
                        value={userData.ponovljenaLozinka}
                        onChange={(e) => handleFieldChange('ponovljenaLozinka', e.target.value)}
                        // @ts-ignore
                        error={!!errors.ponovljenaLozinka}
                        // @ts-ignore
                        helperText={errors.ponovljenaLozinka}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleRegistration} fullWidth sx={{ mt: 3, mb: 2 }}>
                        Registruj se
                    </Button>
                </Box>
            </Container>
        );
    }

    return <div></div>

};

export default RegistrationPage;
