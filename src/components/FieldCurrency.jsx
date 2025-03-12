import React, { useState } from 'react';

const FieldCurrency = ({ value, onChange, placeholder = "Enter amount" }) => {
  
  // Format number as currency
  const formatCurrency = (num) => {
    if (!num) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };
  
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  

  // Handle input change
  const handleChange = (e) => {
    // Remove all non-numeric characters except decimal point
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    
    // Ensure only valid decimal numbers
    const numericValue = parseFloat(rawValue);
    
    if (!isNaN(numericValue)) {
      setDisplayValue(formatCurrency(numericValue));
      onChange(numericValue);
    } else {
      setDisplayValue('');
      onChange('');
    }
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="currency-input"
    />
  );
};

export default FieldCurrency;
