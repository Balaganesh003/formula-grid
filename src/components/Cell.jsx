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
      className="border border-custom-blue outline-none p-2 text-custom-dark hover:shadow-[4px_4px_0px_#3139FB] focus:shadow-[4px_4px_0px_#3139FB] transition-all duration-300  ease-linear"
    />
  );
});

export default Cell;
