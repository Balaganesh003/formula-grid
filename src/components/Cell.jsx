import React, { forwardRef } from 'react';

const Cell = forwardRef(({ value, onChange, onBlur, onKeyDown }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)} // Extract string value from event
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className="border border-gray-300 p-2 m-1"
    />
  );
});

export default Cell;
