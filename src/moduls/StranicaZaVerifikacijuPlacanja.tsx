import React from 'react';
import './../App.css';

function Home() {
  const handleGenerateCodeClick = () => {
    // Slanje zahteva na backend kada korisnik klikne na dugme
    fetch('/get/verification/cokeee')
      .then(response => {
        if (response.ok) {
          // Ako je zahtev uspešan, možete ovde dodati dodatne korake, ako je potrebno
          console.log(response);
        } else {
          // Ako zahtev nije uspeo, obradimo različite status kodove odgovora
          if (response.status === 404) {
            console.error('Ruta nije pronađena.');
          } else {
            console.error('Greška prilikom generisanja verifikacionog koda.');
          }
        }
      })
      .catch(error => {
        // Ako dođe do greške prilikom slanja zahteva, možete je ovde obraditi
        console.error('Došlo je do greške prilikom slanja zahteva:', error);
      });
  };

  // Postavite naslov stranice na "Verifikacija"
  React.useEffect(() => {
    document.title = "Verifikacija";
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Verifikacija</h1>
      <p>Ispod možete generisati verifikacioni kod</p>
      {/* Dodajemo onClick event handler koji će pozvati handleGenerateCodeClick funkciju kada se klikne na dugme */}
      <div className='learn-more-btn' onClick={handleGenerateCodeClick}>
        <p>Generiši verifikacioni kod</p>
      </div>
    </div>
  );
}

export default Home;
