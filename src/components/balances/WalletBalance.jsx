/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InvestmentIcon2 } from '../../assets/icons/Icon';
import SkeletonLoader from '../loaders/SkeletonLoader';

const WalletBalance = ({ balance, isLoading }) => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex space-x-2 items-center'>
        <InvestmentIcon2 />
        <span>Wallet Balance</span>
        <button className="focus:outline-none" onClick={toggleBalanceVisibility}>
          {showBalance ? (
            <FiEye className="h-5 w-5 text-gray-600" />
          ) : (
            <FiEyeOff className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      {isLoading ? <SkeletonLoader /> :
        <h2 className='font-semibold text-[#393939] text-[25px]'>
        ₦{showBalance ? balance : '****'}
      </h2> 
      }
    </div>
  );
};

export default WalletBalance;