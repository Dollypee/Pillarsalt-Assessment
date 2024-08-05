/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getInitials } from "../../helper/Helper"
import { useUserProfileMutation } from "../../redux/services/user.api";
import { toast } from "react-toastify";
import CustomTextField from "../../components/inputs/CustomTextField";
import SkeletonLoader from "../../components/loaders/SkeletonLoader";

const Profile = () => {
  const [userdetails, setUserDetails] = useState({});
  const [getUser, { isLoading }] = useUserProfileMutation();

  useEffect(() => {
    const getUserData = async () => {
      await getUser().unwrap().then(res => setUserDetails(res?.data?.profile)).catch(() => toast.error('Error fetching profile details'));
    }
    getUserData();
  }, []);


  return (
    <div className="flex flex-col items-center max-w-[500px] mx-auto w-full bg-primary border border-[#F0F0F0] rounded-[20px] p-6">
      <div className='gap-x-1 flex items-center justify-center'>
        <div className="relative inline-block">
          {
            isLoading ?
              <div className="mb-4">
                <div className="w-[150px] h-[150px] bg-[#F0F0F0] rounded-full flex items-center justify-center text-white border border-white font-bold text-lg animate-spin">
                  
                </div>
                <span className="w-4 h-4 rounded-full bg-[#00A600] border-2 border-white absolute right-5 top-2"></span>
              </div> :
              <>
                <div className="w-[150px] h-[150px] bg-primary rounded-full flex items-center justify-center text-white border border-white font-bold text-lg">
                  {getInitials(userdetails?.firstname, userdetails?.lastname)}
                </div>
                <span className="w-4 h-4 rounded-full bg-[#00A600] border-2 border-white absolute right-5 top-2"></span>
              </>
          }
        </div>
        {/* <IoIosArrowDown /> */}
      </div>

      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 mt-4 w-full">
        {
          isLoading ?
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">{'Firs tName'}</label>
              <SkeletonLoader />
            </div> :
            <CustomTextField
              label={'First Name'}
              id={'firstName'}
              variant={'outlined'}
              value={userdetails?.firstname}
              // onChange={(e) => setInput({ ...input, firstName: e.target.value })}
              type='text'
            />
        }
        {
          isLoading ?
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">{'Last Name'}</label>
              <SkeletonLoader />
            </div> :

            <CustomTextField
              label={'Last Name'}
              variant={'outlined'}
              value={userdetails?.lastname}
              // onChange={(e) => setInput({ ...input, lastName: e.target.value })}
              type='text'
            />
        }
        {
          isLoading ?
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">{'Middle Name'}</label>
              <SkeletonLoader />
            </div> :
            <CustomTextField
              label={'Middle Name'}
              variant={'outlined'}
              value={userdetails?.middlename}
              // onChange={(e) => setInput({ ...input, middleName: e.target.value })}
              type='text'
            />
        }
        {
          isLoading ?
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">{'Phone Number'}</label>
              <SkeletonLoader />
            </div> :
            <CustomTextField
              label={'Phone Number'}
              variant={'outlined'}
              value={userdetails?.phonenumber}
              // onChange={(e) => {
              //   const phoneValue = e.target.value;
              //   const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
              //   setIsPhoneValid(phoneRegex.test(phoneValue));
              //   setInput({ ...input, phoneNumber: phoneValue });
              // }}
              type='tel'
            />
        }
      </div>
      <div className="w-full">
        {
          isLoading ?
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">{'Email Address'}</label>
              <SkeletonLoader />
            </div> :
            <CustomTextField
              label={'Email Address'}
              variant={'outlined'}
              value={userdetails?.emailaddress}
              // onChange={(e) => {
              //   const emailValue = e.target.value;
              //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              //   setIsEmailValid(emailRegex.test(emailValue));
              //   setInput({ ...input, email: e.target.value })
              // }}
              type='email'
            />
        }
      </div>

    </div>
  )
}

export default Profile