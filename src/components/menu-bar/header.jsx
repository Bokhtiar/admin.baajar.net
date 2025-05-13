import React, { useState, useRef, useEffect } from "react";
import ThemeColor from "./mode";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { FiGrid, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import userimg from "../../assets/logo/userimg.jpg";
import { CiSettings } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa";

const Header = ({
  toggleSidebar,
  menuOpen,
  setMenuStyle,
  menuStyle,
  setMenuPosition,
  menuPosition,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  // const [header, setHeader] = useState("fixed");
  // const [menuStyle, setMenuStyle] = useState("click");

  // const [layoutStyle, setLayoutStyle] = useState("fullWidth");

  // console.log("header",header)

  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };
  const toggleTheme = (selectedTheme) => {
    if (theme !== selectedTheme) {
      setTheme(selectedTheme);
      setCheck(selectedTheme);
    }
  };
  // ✅ Click Outside to Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // USE FLAG
  useEffect(() => {
    fetch("https://ipinfo.io?token=d12e9ebf8437bb")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const countryCode = data.country.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`; // Removed the extra space
        setFlagUrl(flagUrl);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleFullscreen = () => {
    const element = document.documentElement; // You can also use any specific element
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error("Failed to enable fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className={`bg-lightCard dark:bg-darkCard  py-4 px-2 shadow-md dark:shadow-md w-full ${
        menuPosition === "fixed" ? "fixed top-0 right-0" : "relative"
      } z-10  `}
    >
      {menuStyle == "click" && !menuOpen && (
        <RiMenuUnfold3Fill
          onClick={() => toggleSidebar()}
          className="absolute left-5 top-6 text-2xl z-10 cursor-pointer text-lightTitle dark:text-darkTitle"
        />
      )}
      <div className="flex justify-end gap-5 items-center relative">

        {/* <div>
          <div className="hidden md:block">
            <ThemeColor toggleTheme={toggleTheme} theme={theme} />
          </div>
        </div> */}

        <div className="relative">
          <IoNotificationsOutline className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />

          {/* Badge with blinking and solid center */}
          {/* <div className="absolute -top-1 -right-1">
            <div className="relative h-5 w-5">
              
              <span className="absolute top-0 left-0 h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>

              
              <span className="absolute top-0 left-0 h-full w-full rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                999
              </span>
            </div>
          </div> */}
        </div>

        
        {/* <div onClick={handleFullscreen}>
          <RiFullscreenFill className="text-4xl bg-gray-200 p-2 rounded-full cursor-pointer hidden md:block" />
        </div> */}
       

        {/* User Profile Section */}
        <div className="relative" ref={popupRef}>
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

                <li className="flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500 group relative">
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                  <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-red-500 transition-all duration-700 group-hover:w-[80%] group-hover:left-[10%]"></span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <CiSettings
          onClick={() => setIsOpen(true)}
          className="text-3xl rounded-full animate-[spin_2s_linear_infinite] dark:text-darkTitle cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
