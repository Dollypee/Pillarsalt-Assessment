/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import WalletBalance from '../../components/balances/WalletBalance'
import { useUser } from '../../hooks/user.hook'
import { useGetUserWalletMutation } from '../../redux/services/wallet.api';
import { toast } from 'react-toastify';
import { ROIIcon } from '../../assets/icons/Icon';
import SkeletonLoader from '../../components/loaders/SkeletonLoader';

const Wallet = () => {
  const user = useUser();

  const [wallet, setWallet] = useState({});

  const [getUserWallet, {isLoading}] = useGetUserWalletMutation();

  useEffect(() => {
    const getWalletDetails = async () => {
      await getUserWallet().unwrap().then(res => setWallet(res?.data)).catch(() => toast.error('An error occured in fetching user wallet details'))
    }
    getWalletDetails();
  }, [])

  return (
    <div>
      <div className="my-3 flex space-x-2 items-center font-title">
        <h4 className="pillarsalt-heading-four">Welcome,</h4>
        <h3 className="pillarsalt-heading-three">{user?.user?.firstname}</h3>
      </div>
      <div className='w-full bg-white rounded-[20px] py-6 px-3'>
        <div className='flex flex-col gap-4 md:flex-row md:justify-between'>

          <WalletBalance
            balance={wallet?.balance}
            isLoading={isLoading}
          />
          <div className='flex flex-col gap-1'>
            <div className='flex space-x-2 items-center'>
              <ROIIcon />
              <span>Wallet Number</span>
            </div>
            {isLoading ? <SkeletonLoader /> :
              <h3 className='text-[#393939] text-[25px] font-title'>{wallet?.walletNumber}</h3>
            }
          </div>
          <div>
            <button className='bg-primary text-white flex items-center space-x-3 rounded-xl py-3 px-6 font-medium text-base'>
              <span>+</span>
              <span>Top up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet