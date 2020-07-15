import React from 'react';

export default function Input({ name, data, ...props }) {
  return (
    <>
      <input
        className="vcx"
        type="text"
        id={name}
        name={name}
        value={data.value}
        {...props}
      />
      {data.error && <p className="error-message">{data.error}</p>}
    </>
  );
}
