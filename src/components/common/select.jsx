import React from "react";

const Select = ({ name, lable, options, onChange, error, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
