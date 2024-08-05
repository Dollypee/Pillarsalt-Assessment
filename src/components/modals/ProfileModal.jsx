/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { FiLogOut } from "react-icons/fi";
import { useUser } from "../../hooks/user.hook";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

const ProfileModal = ({ isOpen, onClose, userEmail, userName }) => {
  if (!isOpen) return null;

  const user = useUser();
  const navigate = useNavigate()

  // Function to get initials
  const getInitials = (firstName, lastName) => {
    return firstName?.charAt(0) + lastName?.charAt(0);
  };


  return (
    <div className="bg-white rounded-lg shadow-lg md:max-w-80 md:w-full max-w-[250px] px-1rem md:px-auto absolute left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:translate-x-0 top-[45px] mt-4">
      <div className="p-4 flex justify-between items-center">
        <span className="text-gray-600"></span>
        <button onClick={onClose}>
          <CgClose size={20} style={{color: '#FF0000'}} />
        </button>
      </div>
      <div className="px-4 pb-4 flex flex-col items-center">
        <div className='gap-x-1 flex items-center justify-center mb-2'>
          <div className="relative inline-block">
            <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              {getInitials(user?.user?.firstname, user?.user?.lastname)}
            </div>
            <span className="w-4 h-4 rounded-full bg-[#00A600] border-2 border-white absolute right-0 top-0"></span>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 truncate w-full text-center">Hi, {userName}!</h2>
        <span className="text-gray-600 mb-2 truncate max-w-[200px]">{userEmail}</span>
        <button className="bg-[rgba(206,217,224,0.9)] text-primary px-4 py-2 rounded-full mb-4" onClick={() => {
          navigate('/user/profile');
          onClose();
        }}>
          Manage your Account
        </button>
        <div className="w-full flex justify-center mb-4">
        <button
          className="cursor-pointer flex items-center space-x-2 pl-7"
          onClick={() => {
            navigate("/login");
          }}
        >
          <FiLogOut style={{color: '#FF0000'}} />
          <span className="text-red-500">Log out</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal
