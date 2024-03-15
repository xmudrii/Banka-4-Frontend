import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ResetPasswordPage.css';
import PasswordInput from './PasswordInput';
import { makeApiRequest } from './utils/apiRequest';

// Constants for styling
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#297cb7',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
  },
  errorText: {
    color: '#860e04',
    fontSize: '14px',
  },
  label: {
    display: 'block',
    margin: '5px 0',
  },
};

const red = "#860e04";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*\d.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#$!%^&*()_+|~=`{}[\]:";'<>?,./\\-]{8,32}$/;

const ResetPasswordPage = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [activationCodeValid, setActivationCodeValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const validateEmail = () => {
    setEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setPasswordValid(passwordRegex.test(newPassword));
  };

  const validateActivationCode = () => {
    setActivationCodeValid(activationCode.trim() !== "");
  };

  const sendRequest = async () => {
    try {
      await makeApiRequest("/korisnik/generate-reset-korisnici", "POST", { email })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetPassword = async () => {
    try {
      await makeApiRequest("/korisnik/reset-password", "POST", {
        email,
        sifra: newPassword,
        kod: activationCode,
      })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h2>Stranica za resetovanje šifre</h2>

      <div style={styles.formContainer}>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Polje za unos mejla:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {!emailValid && <p style={styles.errorText}>Unesite ispravan mejl</p>}
          <button type="button" disabled={!emailValid} onClick={sendRequest}>
            Pošalji zahtev
          </button>

        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="activationCode" style={styles.label}>
            Polje za unos aktivacionog koda:
          </label>
          <input
            style={styles.input}
            type="text"
            id="activationCode"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            onBlur={validateActivationCode}
          />
          {!activationCodeValid && (
            <p style={styles.errorText}>Unesite ispravan aktivacioni kod</p>
          )}
        </div>

        <div style={styles.inputGroup}>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {!passwordValid && (
            <p style={styles.errorText}>
              Lozinka mora imati najmanje 8 karaktera, najviše 32 karaktera,
              najmanje 2 broja, najmanje 1 veliko slovo i najmanje 1 malo slovo
            </p>
          )}
        </div>

        <button
          style={styles.button}
          type="button"
          disabled={!activationCodeValid || !passwordValid}
          onClick={resetPassword}
        >
          Restartuj šifru
        </button>
      </div>
    </div>
  );
};
export default ResetPasswordPage;