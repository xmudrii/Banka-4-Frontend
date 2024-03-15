import React, { useState, useRef } from 'react';
import './../App.css';
import { makeApiRequest } from '../utils/apiRequest';
import { getMe } from '../utils/getMe';

const auth = getMe();
let emailKorisnikov = "";
if (auth) {
  emailKorisnikov = auth.sub;
  console.log(emailKorisnikov);
} else {
  console.error("Nije moguće dobiti informacije o korisniku.");
}


const Verifikacija: React.FC = () => {
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const codeRef = useRef<HTMLInputElement>(null);

  const sendOtpWithEmail = async () => {
    const res = await makeApiRequest(`/generate-otp?email=${emailKorisnikov}`, "POST")
    if (res) {
      console.log(res);
      setVerificationSuccess(true);
      setGeneratedCode(res);
    }

  }

  const copyToClipboard = () => {
    if (codeRef.current) {
      codeRef.current.select();
      document.execCommand('copy');
    }
  };

  React.useEffect(() => {
    document.title = "Verifikacija";
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Verifikacija</h1>
      <p>Ispod možete generisati verifikacioni kod</p>
      {verificationSuccess && (
        <div style={{ paddingBottom: "20px" }}>
          <p>Verifikacioni kod uspešno generisan:</p>
          <input type="text" ref={codeRef} value={generatedCode} readOnly />
          <button className='learn-more-btn' onClick={copyToClipboard}>Kopiraj u clipboard</button>
        </div>
      )}
      <div className='learn-more-btn' onClick={() => sendOtpWithEmail()}>
        <p>Generiši verifikacioni kod</p>
      </div>
    </div>
  );
}


export default Verifikacija;
