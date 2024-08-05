/* eslint-disable react/prop-types */
import  { useState, useRef, useEffect } from 'react';

const DigitInput = ({onChange}) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    const newCombinedValue = digits.join('');
    if (onChange) {
      onChange(newCombinedValue);
    }
  }, [digits, onChange]);


  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && digits[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.slice(0, 6).split('').filter(char => /^\d$/.test(char));

    if (pastedDigits.length === 6) {
      setDigits(pastedDigits);
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default DigitInput;