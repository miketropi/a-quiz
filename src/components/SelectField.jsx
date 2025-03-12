import React from 'react';

const SelectField = ({ label, options, value, onChange, name, required, readOnly }) => {

  return (
    <div className="select-field">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        className={ [(readOnly == true ? '__readonly' : '')].join(' ') }
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
