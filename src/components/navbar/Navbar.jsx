/* eslint-disable react/prop-types */
import { BellIcon } from '../../assets/icons/Icon';
import { BsList } from 'react-icons/bs';
import ProfileIcon from '../profileIcon/ProfileIcon';
import { useUser } from '../../hooks/user.hook';


const Navbar = ({ height, navHeading, open, toggleSidebar }) => {
  const user = useUser();

  return (
    <nav className="pr-6 flex justify-between items-center border-b" style={{ height: height }}>
      <div className='flex items-center space-x-2'>
        {open ? ('') : (
          <button
            className='ml-3 mt-2  block xl:hidden'
            onClick={toggleSidebar}
          >
            <BsList className='w-8 h-8' />
          </button>
        )}
        <h3 className='px-4 pl-16 lg:pl-8 text-primary pillarsalt-heading-three font-bold'>
          {navHeading}
        </h3>
      </div>

      <ul className="flex items-center justify-center list-none">
        <li className="px-4 cursor-pointer hover:text-gray-300">
          <div className='space-x-3 flex items-center justify-center'>
           <BellIcon />
           <ProfileIcon firstName={user?.user?.firstname} lastName={user?.user?.lastname} />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;