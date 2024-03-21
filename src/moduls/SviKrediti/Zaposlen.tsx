import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kredit } from './../../utils/types';

const auth = getMe();
let emailKorisnikov = "";

if (auth) {
    emailKorisnikov = auth.sub;

} else {
    console.error("Nije moguće dobiti informacije o korisniku.");
}



function Zaposlen() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);

    useEffect(() => {
       
        
        fetch(`http://api.stamenic.work:8080/api/kredit/neOdobrenKredit?email=${encodeURIComponent(emailKorisnikov)}`)
            .then(response => response.json())
            .then(data => setKrediti(data))
            .catch(error => console.error('Greška pri dohvatanju podataka:', error));
    }, []);

    
const navigate = useNavigate();

const odobri = (index: number) => {
    const kredit = krediti[index];
    fetch(`http://api.stamenic.work:8080/api/kredit/odobri`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: kredit.id })
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Odobren kredit za: ${kredit.VrstaKredita}`);
        console.log(data);
    })
    .catch(error => console.error('Greška pri odobravanju kredita:', error));
};

const odbij = (index: number) => {
    const kredit = krediti[index];
    fetch(`http://api.stamenic.work:8080/api/kredit/odbij`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: kredit.id })
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Odbijen kredit za: ${kredit.VrstaKredita}`);
        console.log(data);
    })
    .catch(error => console.error('Greška pri odbijanju kredita:', error));
};

    
    const handleRedClick = (kredit: Kredit) => {
        localStorage.setItem('selectedKredit', JSON.stringify(kredit));
        navigate(`/pojedinacniKredit`);
    };
    
    
    return (
        <div>
        <p>Email adresa: {emailKorisnikov}</p>
        <Tabela krediti={krediti} onClickRed={handleRedClick} />
        {krediti.map((kredit, index) => (
            <div key={index}>
                <button onClick={() => odobri(index)}>Odobri</button>
                <button onClick={() => odbij(index)}>Odbij</button>
            </div>
        ))}
    </div>
    );
    
}

export default Zaposlen;
