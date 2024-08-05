/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useLocation } from "react-router-dom";


const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [navHeading, setNavHeading] = useState('')
  const location = useLocation();


  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    function handleResize() {
      // Check if the screen width is greater than a certain value (e.g., 1024 pixels)
      if (window.innerWidth > 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname?.startsWith('/dashboard/wallet')) {
      setNavHeading('Account Wallet')
    } if (location.pathname?.startsWith('/user/profile')) {
      setNavHeading('User Profile')
    } 
  }, [location.pathname]);

  const width = "240px";
  const height = "60px";

  return (
    <>
      <div className="flex bg-[#F8F8F8] h-screen">
        <div className="flex">
          <Sidebar isSidebarOpen={open} handleOpen={handleOpen} width={width} />
        </div>

        <div className={`flex-1 ml-0 lg:ml-auto ${screen.width < 1024 && open && 'bg-opacity-30 bg-black'}`} style={{ marginLeft: `${(open && screen.width > 1023) ? width : '0'}` }}>
          <Navbar toggleSidebar={() => setOpen(!open)} height={height} navHeading={navHeading} open={open} />
          <div className={` mx-3 xl:mx-9 mb-4 mt-3 p-6 lg:p-8 rounded-md`} style={{ minHeight: `${screen.width > 1024 ? 'calc(100vh - 90px)' : 'auto'}`, overflowY: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </>


  );
};

export default DashboardLayout;