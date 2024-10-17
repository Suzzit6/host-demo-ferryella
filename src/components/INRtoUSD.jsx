import React, { useState, useEffect } from 'react';

function InrToUsdConverter({ amountInr }) {
  const [amountUsd, setAmountUsd] = useState(null);

  useEffect(() => {
    async function convertCurrency() {
      if (!amountInr) {
        setAmountUsd(null);
        return;
      }

      const apiUrl = 'https://api.frankfurter.app/latest?from=INR&to=USD';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.rates && data.rates.USD) {
          const exchangeRate = data.rates.USD;
          const convertedAmount = (parseFloat(amountInr) * exchangeRate).toFixed(2);
          setAmountUsd(convertedAmount);
        } else {
          throw new Error('Failed to fetch exchange rate');
        }
      } catch (error) {
        console.error('Error:', error);
        setAmountUsd(null);
      }
    }

    convertCurrency();
  }, [amountInr]);

  if (amountUsd === null) {
    return <span>Unable to convert</span>;
  }

  return <span>{amountUsd} USD</span>;
}

export default InrToUsdConverter;