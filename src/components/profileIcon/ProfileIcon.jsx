/* eslint-disable react/prop-types */

import { useState } from "react";
import ProfileModal from "../modals/ProfileModal";
import { useUser } from "../../hooks/user.hook";

// import { IoIosArrowDown } from "react-icons/io";

const ProfileIcon = ({ firstName, lastName }) => {
  // Function to get initials
  const getInitials = (firstName, lastName) => {
    return firstName?.charAt(0) + lastName?.charAt(0);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useUser();
  return (
    <>
      <div>
        <ul className="flex items-center justify-center">
          <li className="px-4 cursor-pointer hover:text-gray-300 hidden md:block">
            <div className='flex flex-col justify-end items-end'>
              <h2 className='loxford-heading-three text-primary'>{firstName + ' ' + lastName}</h2>
            </div>
          </li>
          <li className="px-4 cursor-pointer">
            <div className='gap-x-1 flex items-center justify-center' onClick={() => setIsModalOpen(true)}>
              <div className="relative inline-block">
                {/* <img src={AvatarYusuf} alt='Avatar' className='w-[64px] h-[64px] ' /> */}
                <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(firstName, lastName)}
                </div>
                <span className="w-4 h-4 rounded-full bg-[#00A600] border-2 border-white absolute right-0 top-0"></span>
              </div>
              {/* <IoIosArrowDown /> */}
            </div>
          </li>
        </ul>
      </div>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={user?.user?.emailaddress}
        userName={user?.user?.firstname}
      />
    </>
  );
};

export default ProfileIcon;