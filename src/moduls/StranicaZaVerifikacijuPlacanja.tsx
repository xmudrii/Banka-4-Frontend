import React, { useState } from 'react';
import './../App.css';
import { makeApiRequest } from '../utils/apiRequest';

function Verifikacija() {
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false); // Stanje koje označava da li je verifikacioni kod uspešno generisan

  const sendOtpWithEmail = async (email: string) => {
    const res = await makeApiRequest(`generate-otp?email=${email}`, "POST")
    if (res) {
      setVerificationSuccess(true);
    }
  }


  React.useEffect(() => {
    document.title = "Verifikacija";
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Verifikacija</h1>
      <p>Ispod možete generisati verifikacioni kod</p>
      {/* Ako je verifikacioni kod uspešno generisan, prikaži poruku */}
      {verificationSuccess && <p>Verifikacioni kod uspešno generisan</p>}
      {/* Dodajemo onClick event handler koji će pozvati handleGenerateCodeClick funkciju kada se klikne na dugme */}
      <div className='learn-more-btn' onClick={() => sendOtpWithEmail('btomic620rn@raf.rs')}>
        <p>Generiši verifikacioni kod</p>
      </div>
    </div>
  );
}

export default Verifikacija;
