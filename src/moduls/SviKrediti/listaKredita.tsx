import React, { useState, useEffect } from 'react';
import Zaposlen from './Zaposlen';
import NeZaposlen from './NeZaposlen';
import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import { Kredit } from './../../utils/types';
import { useNavigate } from 'react-router-dom';


const auth = getMe();
let emailKorisnikov = "";
let zaposlen = false;
if (auth) {
    emailKorisnikov = auth.sub;
    if (auth.permission)
        zaposlen = true;
} else {
    console.error("Nije moguće dobiti informacije o korisniku.");
}


function ListaKredita() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);
    const navigate = useNavigate(); // Dodato za useNavigate

    useEffect(() => {
    
        fetch(`http://api.stamenic.work:8080/api/kredit/odobreniKrediti?email=${encodeURIComponent(emailKorisnikov)}`)
        .then(response => response.json())
        .then(data => setKrediti(data))
        .catch(error => console.error('Greška pri dohvatanju podataka:', error));
    }, []);

    
    const posalji = () => {
        // Implementacija posalji funkcije
    };

    const handleRedClick = (kredit: Kredit) => {
        localStorage.setItem('selectedKredit', JSON.stringify(kredit));
        navigate(`/pojedinacniKredit`);
    };
    
    

    return (
        <div>
            {zaposlen ? <Zaposlen /> : <NeZaposlen />}
            <Tabela krediti={krediti} onClickRed={handleRedClick} />
            <button onClick={() => posalji()}>Posalji</button>
        </div>
    );
}

export default ListaKredita;
