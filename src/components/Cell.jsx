import React, { forwardRef } from 'react';
import ArrowRevert from '../assets/arrow-revert.png'

const Cell = forwardRef(({ value, onChange, onBlur,onFocus, onKeyDown, onRevert }, ref) => {
  return (
     <div className="inline-flex relative w-full">
    <input
      ref={ref}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className="border border-custom-blue outline-none p-2 text-custom-dark hover:shadow-[4px_4px_0px_#3139FB] focus:shadow-[4px_4px_0px_#3139FB] transition-all duration-300 ease-linear w-full"
    />
    <button onClick={onRevert} className="absolute top-1 right-1 hover:scale-110 transition-all duration-200 ease-linear">
      <img src={ArrowRevert} alt='arrow-revert' className='w-5 h-5'/>
    </button>
  </div>
  );
});

export default Cell;
