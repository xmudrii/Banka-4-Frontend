import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import PasswordInput from "./PasswordInput";
import ResetPasswordService from "./ResetPasswordService";
const red = "#5e8c61";

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

  const sendRequest = () => {
    console.log("Zahtev za verifikacioni kod poslat za email:", email);

    ResetPasswordService.sendVerificationRequest(email)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const resetPassword = () => {
    console.log("Zahtev za restartovanje šifre poslat za email:", email);
    console.log("Aktivacioni kod:", activationCode);
    console.log("Nova šifra:", newPassword);

    ResetPasswordService.resetPassword(email, activationCode, newPassword)
      .then(() => {
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Stranica za resetovanje šifre</h2>

      <div>
        <div>
          <label htmlFor="email">Polje za unos mejla:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {!emailValid && <p style={{ color: red }}>Unesite ispravan mejl</p>}

          <button type="button" disabled={!emailValid} onClick={sendRequest}>
            Pošalji zahtev
          </button>
        </div>
        <div>
          <label htmlFor="activationCode">
            Polje za unos aktivacionog koda:
          </label>
          <input
            type="text"
            id="activationCode"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            onBlur={validateActivationCode}
          />
          {!activationCodeValid && (
            <p style={{ color: red }}>Unesite ispravan aktivacioni kod</p>
          )}
        </div>

        <PasswordInput
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={validatePassword}
        />
        {!passwordValid && (
          <p style={{ color: red }}>
            Lozinka mora imati najmanje 8 karaktera, najviše 32 karaktera,
            najmanje 2 broja, najmanje 1 veliko slovo i najmanje 1 malo slovo
          </p>
        )}

        <button
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
