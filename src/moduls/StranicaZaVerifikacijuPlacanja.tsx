import React, { useState } from 'react';
import './../App.css';

function Home() {
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false); // Stanje koje označava da li je verifikacioni kod uspešno generisan

  const sendOtpWithEmail = (email: string) => {
    const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhbi5rcnN0aWNAZ21haWwuY29tIiwicGVybWlzc2lvbiI6ODE5MSwiaWQiOjExLCJleHAiOjE3MTA0MzA1MTksImlhdCI6MTcxMDQwMTcxOX0.ZL3tvz9udJ_-fP5FcRuc6C2O6UTfhGicYVU-xyk9kcEJDCww71LjaTj9klCCyppb7m7HUJcY5-DhpfxR9ojbLA';
    
    fetch('http://api.stamenic.work:8080/api/generate-otp?email='+email, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    .then(response => {
      if (response.ok) {
        console.log(response);
        setVerificationSuccess(true); // Postavlja stanje da označi da je verifikacioni kod uspešno generisan
      } else {
        if (response.status === 404) {
          console.error('Ruta nije pronađena.');
        } else {
          console.error('Greška prilikom generisanja verifikacionog koda.');
        }
      }
    })
    .catch(error => {
      console.error('Došlo je do greške prilikom slanja zahteva:', error);
    });
  };

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

export default Home;
