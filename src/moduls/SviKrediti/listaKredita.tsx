import { useState, useEffect } from 'react';
import Zaposlen from './Zaposlen';
import NeZaposlen from './NeZaposlen';
import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import { BankRoutes, Kredit } from './../../utils/types';
import { useNavigate } from 'react-router-dom';
import { makeGetRequest } from 'utils/apiRequest';

const auth = getMe();
// let emailKorisnikov = "";
let zaposlen = false;
if (auth) {
    // emailKorisnikov = auth.sub;
    if (auth.permission)
        zaposlen = true;
} else {
}

function ListaKredita() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);
    const [krediti2, setKredit] = useState<Kredit[]>([]);
    const navigate = useNavigate(); // Dodato za useNavigate

    useEffect(() => {
        const fetchData = async () => {
            const approvedData = await makeGetRequest(`${BankRoutes.credit_all}/approved`) as Kredit[];
            const notApprovedData = await makeGetRequest(`${BankRoutes.credit_all}/not_approved`) as Kredit[];

            setKrediti(approvedData);

            let data = [] as Kredit[];
            data = data.concat(notApprovedData?.map(kredit => ({ ...kredit, status: 'ne odobren' })));
            data = data.concat(approvedData?.map(kredit => ({ ...kredit, status: 'odobren' })));

            setKredit(data);
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const posalji = () => {
    //     // Implementacija posalji funkcije
    // };

    const handleRedClick = (kredit: Kredit) => {
        localStorage.setItem('selectedKredit', JSON.stringify(kredit));

        if (kredit?.status !== 'ne odobren') {
            navigate(`/pojedinacniKredit`);
        }
    };

    return (
        <div>
            {zaposlen ? <div><Zaposlen />
                <Tabela krediti={krediti2} onClickRed={handleRedClick} /> </div> : <div>  <NeZaposlen /> <Tabela krediti={krediti} onClickRed={handleRedClick} /> </div>}

        </div>
    );
}

export default ListaKredita;
