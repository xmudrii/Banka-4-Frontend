import React, { useState, useEffect } from 'react';
import KreditiTabela from './KreditiTabela';
import TransakcijeTabela from './TransakcijeTabela';
import { KreditPojedinacni, Transakcija } from '../../utils/types';

const PojedinacniKreditStranica = () => {
  const [kredit, setKredit] = useState<KreditPojedinacni | null>(null);
  const [transakcije, setTransakcije] = useState<Transakcija[]>([]);

  useEffect(() => {
    const storedKredit = localStorage.getItem('selectedKredit');
    let parsedKredit = null;

    if (storedKredit) {
      parsedKredit = JSON.parse(storedKredit);
      console.log('Učitani kredit iz local storage-a:', parsedKredit);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.stamenic.work:8080/api/kredit/neOdobreniKrediti?id=${encodeURIComponent(parsedKredit.id)}`)
        const data = await response.json();
        setKredit(data.kredit);
        setTransakcije(data.transakcije);
      } catch (error) {
        console.error('Greška pri preuzimanju podataka:', error);
      }
    };

    if (parsedKredit) {
      fetchData();
    }
  }, []);


  
  return (
    <div>
      {kredit && <KreditiTabela kredit={kredit} />}
      {transakcije.length > 0 && <TransakcijeTabela transakcije={transakcije} />}
    </div>
  );
};

export default PojedinacniKreditStranica;
