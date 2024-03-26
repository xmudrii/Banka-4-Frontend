import React, { useState, useEffect } from 'react';
import Zaposlen from './Zaposlen';
import NeZaposlen from './NeZaposlen';
import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import { Kredit } from './../../utils/types';
import { useNavigate } from 'react-router-dom';
import { makeGetRequest } from 'utils/apiRequest';


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

    useEffect(async () => {
        const data = await makeGetRequest(`/kredit/odobreniKrediti?email=${encodeURIComponent(emailKorisnikov)}`)
        setKrediti(data)
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
