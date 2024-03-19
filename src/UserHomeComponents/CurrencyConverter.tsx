import React, { useState, useEffect } from 'react';
import styles from './CurrencyConverter.module.css'; // Importujemo CSS modul

type CurrencyRate = {
  code: string;
  rate: number; // Kurs u odnosu na dinar
};

// Primer kursne liste
const MOCK_CURRENCY_RATES: CurrencyRate[] = [
  { code: 'EUR', rate: 117.5 },
  { code: 'USD', rate: 97.3 },
  { code: 'GBP', rate: 137.2 },
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>(MOCK_CURRENCY_RATES);

  useEffect(() => {
    // Ovde bi se implementirao poziv na backend za dobijanje kursne liste
    // setCurrencyRates(fetchedRates);
  }, []);

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFromCurrency = e.target.value;
    if (newFromCurrency === toCurrency) {
      setToCurrency(fromCurrency);
    }
    setFromCurrency(newFromCurrency);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newToCurrency = e.target.value;
    if (newToCurrency === fromCurrency) {
      setFromCurrency(toCurrency);
    }
    setToCurrency(newToCurrency);
  };

  const calculateConversion = () => {
    if (!amount) return;
    const fromRate = currencyRates.find((cr) => cr.code === fromCurrency)?.rate || 1;
    const toRate = currencyRates.find((cr) => cr.code === toCurrency)?.rate || 1;
    const result = (parseFloat(amount) / fromRate) * toRate;
    setConvertedAmount(result);
  };

  return (
    <div className={styles.container}>
      <input type="text" value={amount} onChange={handleAmountChange} placeholder="Unesite količinu" className={styles.input} />
      <select value={fromCurrency} onChange={handleFromCurrencyChange} className={styles.select}>
        {currencyRates.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={handleToCurrencyChange} className={styles.select}>
        {currencyRates.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
      <label className={styles.label}>Izračunata vrednost: {convertedAmount.toFixed(2)}</label>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kurs u odnosu na dinar</th>
          </tr>
        </thead>
        <tbody>
          {currencyRates.map((rate) => (
            <tr key={rate.code}>
              <td>{rate.code}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {amount === '' && <div className={styles.error}>Molimo unesite količinu.</div>}
    </div>
  );
};

export default CurrencyConverter;
