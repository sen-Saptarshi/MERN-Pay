import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/signin");
  };

  const handleUpdateProfile = () => {
    setIsOpen(false);
    navigate("/update");
  };

  const openDeletePopup = () => {
    setIsOpen(false);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token");
    // Your delete account logic here
    console.log("Account deleted");
    setIsDeletePopupOpen(false);
    navigate("/signin");
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
        >
          Options
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.72a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 cursor-pointer"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Log out
            </div>
            <div
              onClick={handleUpdateProfile}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Update Profile
            </div>
            <div
              onClick={openDeletePopup}
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700"
              role="menuitem"
            >
              Delete Account
            </div>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <DeletePopup
          handleDeleteAccount={handleDeleteAccount}
          closeDeletePopup={closeDeletePopup}
        />
      )}
    </div>
  );
}

function DeletePopup({ handleDeleteAccount, closeDeletePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-base">
          Are you sure you want to delete your account?
        </h2>
        <div className="mt-4 flex">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 font-bold text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 "
          >
            Yes
          </button>
          <button
            onClick={closeDeletePopup}
            className="bg-gray-300 font-bold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 flex-grow"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
