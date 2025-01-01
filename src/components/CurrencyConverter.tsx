import React, { useState, useEffect } from "react";
import { getExchangeRate, getSupportedCurrencies } from "../services/api";
import styles from "./CurrencyConverter.module.css";

interface CurrencyConverterProps {
  countryCode: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  countryCode,
}) => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>(countryCode);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<[string, string][]>([]);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const supportedCurrencies = await getSupportedCurrencies();
        setCurrencies(supportedCurrencies);
      } catch (error) {
        console.error("Error loading currencies:", error);
      }
    };
    loadCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const convertedAmount = exchangeRate
    ? (parseFloat(amount) * exchangeRate).toFixed(2)
    : "0";

  return (
    <div className={styles.container}>
      <h3>Döviz Çevirici</h3>
      <div className={styles.converterBox}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="0"
            step="0.01"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.equals}>=</div>
        <div className={styles.result}>
          <span className={styles.convertedAmount}>{convertedAmount}</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
