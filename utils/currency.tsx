import React from 'react';

const CurrencyFormatter = ({ amount } : any) => {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};
export default CurrencyFormatter;