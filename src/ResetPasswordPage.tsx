import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import PasswordInput from "./PasswordInput";
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
      const response = await fetch("korisnik/generate-reset", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch("korisnik/reset-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          sifra: newPassword,
          kod: activationCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // navigate("/login");
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
