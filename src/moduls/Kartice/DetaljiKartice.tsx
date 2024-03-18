import React, { useState, useEffect } from 'react';
import { Button, Card, Typography } from '@mui/material';
import Swal from 'sweetalert2'; import { useSearchParams } from 'react-router-dom';
import { Kartica } from '../../utils/types';

// Pretpostavljamo da postoji funkcija API za dohvatanje i ažuriranje kartice
const getKarticaDetails = async (id: number): Promise<Kartica> => {
  // Napravite API poziv za dobijanje detalja o kartici
  return {
    id: id,
    naziv: 'Test Kartica',
    broj: '1111222233334444',
    vrsta: 'kreditna',
    datum_kreiranja: Date.now(),
    datum_isteka: Date.now(),
    broj_racuna: '1234567890123456',
    cvv: '123',
    limit: 5000,
    status: 'aktivna',
  };
};

const updateKarticaStatus = async (id: number, status: string): Promise<boolean> => {
  // Napravite API poziv za ažuriranje statusa kartice
  return true; // Simulacija uspeha
};

export default function DetaljiKartice() {
  const [kartica, setKartica] = useState<Kartica | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Ovo će biti ID kartice dobijen iz URL-a
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      console.log(id);
      getKarticaDetails(parseInt(id)).then(setKartica);
    }
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (kartica && await updateKarticaStatus(kartica.id, newStatus)) {
      Swal.fire('Uspeh!', `Kartica je ${newStatus}.`, 'success');
      if (newStatus != 'blokirana' && newStatus != 'aktivna' && newStatus != 'deaktivirana')
        return;
      setKartica({ ...kartica, status: newStatus });
    } else {
      Swal.fire('Greška!', 'Promena statusa nije uspela.', 'error');
    }
  };

  if (!kartica) return <div>Učitavanje...</div>;

  return (
    <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h5">{kartica.naziv}</Typography>
      <Typography>Broj kartice: {showDetails ? kartica.broj : `${kartica.broj.substring(0, 4)} xxxx xxxx ${kartica.broj.substring(12)}`}</Typography>
      <Typography>Vrsta kartice: {kartica.vrsta}</Typography>
      <Typography>Datum kreiranja: {new Date(kartica.datum_kreiranja).toLocaleDateString()}</Typography>
      <Typography>Datum isteka: {new Date(kartica.datum_isteka).toLocaleDateString()}</Typography>
      <Typography>Broj računa: {kartica.broj_racuna}</Typography>
      <Typography>CVV: {showDetails ? kartica.cvv : 'xxx'}</Typography>
      <Typography>Limit: {kartica.limit}</Typography>
      <Typography>Status: {kartica.status}</Typography>
      <Button onClick={() => setShowDetails(!showDetails)}>Prikaži informacije</Button>
      {kartica.status !== 'aktivna' && <Button onClick={() => handleStatusChange('aktivna')}>Aktiviraj</Button>}
      {kartica.status !== 'deaktivirana' && <Button onClick={() => handleStatusChange('deaktivirana')}>Deaktiviraj</Button>}
      {kartica.status !== 'blokirana' && <Button onClick={() => handleStatusChange('blokirana')}>Blokiraj</Button>}
    </Card>
  );
}
