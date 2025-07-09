import React, { useState, useRef } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import userimg from "../../assets/logo/userimg.jpg";
import { CiSettings } from "react-icons/ci";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { removeToken } from "../../utils/helpers";
import { Navigate, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate(`/login?redirectFrom=${window.location.pathname}`);
  };

  return (
    <div
      className={`bg-lightCard dark:bg-darkCard  py-4 px-2 shadow-sm  w-full `}
    >
      <div className="flex justify-between gap-5 items-center relative ">
        <div>
          <h1 className="text-2xl text-red-600 font-bold pl-5 hidden lg:block">
            Bajjar
          </h1>
        </div>

        <RiMenuUnfold3Fill
          onClick={() => toggleSidebar()}
          className="absolute left-5 top- text-2xl z-10 cursor-pointer text-lightTitle dark:text-darkTitle block lg:hidden"
        />

        <div className="flex gap-3 items-center">
          <div className="relative">
            <MdOutlineNotificationsActive className="text-2xl " />
          </div>

          {/* User Profile Section */}
          <div className="" ref={popupRef}>
            <div
              className="flex gap-3 items-center border-r-2 pr-5 border-lightBorder cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img src={userimg} alt="User" className="w-9 h-9 rounded-full" />
              <div className="flex items-center flex-col dark:text-darkTitle">
                <span className="font-bold text-[14px] text-left block">
                  Jone
                </span>
                <span className="text-[12px]">Admin</span>
              </div>
            </div>

            {/* Popup Dropdown with Animation */}
            {showPopup && (
              <div
                className={`absolute right-0 mt-2 w-48 bg-light shadow-lg rounded-lg py-2 dark:bg-darkCard dark:text-darkTitle 
   transition-all duration-300 z-50 `}
              >
                <ul>
                  <li className="flex items-center gap-3 px-4 py-2 cursor-pointer group relative">
                    <FiUser className="text-lg" />
                    <span>Profile</span>
                    {/* Hover underline */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                  </li>

                  <li className="flex items-center gap-3 px-4 py-2 cursor-pointer group relative">
                    <FiSettings className="text-lg" />
                    <span>Settings</span>
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                  </li>

                  <li
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500 group relative"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-red-500 transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <CiSettings className="text-3xl rounded-full animate-[spin_2s_linear_infinite]  cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
