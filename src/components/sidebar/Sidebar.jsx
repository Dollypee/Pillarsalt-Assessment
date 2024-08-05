/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "../../assets/images/images";
import { TransactionIcon } from "../../assets/icons/Icon";
import Button from "../button/Button";
import { FiLogOut } from "react-icons/fi";
import { FaAnglesLeft } from "react-icons/fa6";


const Sidebar = ({ isSidebarOpen, handleOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(0);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  useEffect(() => {
    if (location.pathname == "/dashboard/wallet") {
      setActiveLink(0);
    } else {
      setActiveLink(null);
    }
  }, [location.pathname]);

  const handleLinkClick = (
    index,
    link
  ) => {
    setActiveLink(index);
    if (link.subItems.length > 0) {
      setOpenSubMenu(!openSubMenu);
      navigate(link.path);
    } else {
      navigate(link.path);
      setOpenSubMenu(false);
    }
  };

  const handleSubItemClick = (path) => {
    navigate(path);
    window.innerWidth < 1024 && handleOpen(!isSidebarOpen);
  };

  const links = [
    {
      label: "Wallet",
      path: "/dashboard/wallet",
      icon: <TransactionIcon color={activeLink === 0 ? "#170077" : "#030303"} />,
      subItems: [],
    },
  ];

  return (
    <div
      className={`top-0 left-0 fixed bg-[#f0f0f0] max-w-[240px] h-full z-10 p-10 pt-3 lg:pt-3 flex flex-col justify-between ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300`}
    // style={{ width: width }}
    >
      <div>
        {isSidebarOpen && (
          <button
            className="top-5 z-20 right-4 fixed block lg:hidden"
            onClick={() => handleOpen(!isSidebarOpen)}
          >
            <FaAnglesLeft size={20} />
          </button>
        )}

        <div className="border-b w-full">
          <img src={Logo} alt="Logo" className="object-scale-down" />
        </div>
        <ul style={{ marginTop: "63px", height: "400px", zIndex: 9999 }}>
          {links.map((link, index) => (
            <li key={index} className="flex flex-col mt-3 justify-center">
              <Button
                className={`cursor-pointer ${index === activeLink
                  ? "ardvest-heading-five adverst-bg-light-green text-primary font-bold"
                  : "ardvest-blue"
                  }`}
                onClick={() => handleLinkClick(index, link)}
                title={
                  <div className="flex space-x-4 items-center">
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                }
              />
              {link.subItems.length > 0 &&
                index === activeLink &&
                openSubMenu && (
                  <ul className="mt-2">
                    {link.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => handleSubItemClick(subItem.path)}
                        className={`ml-8 flex flex-row items-stretch cursor-pointer py-2 rounded-lg justify-center px-3`}
                      >
                        <span className="whitespace-nowrap">{subItem.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="cursor-pointer flex items-center space-x-2 pl-7"
          onClick={() => {
            navigate("/login");
          }}
        >
          <FiLogOut style={{ color: '#FF0000' }} />
          <span className="text-red-500">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;