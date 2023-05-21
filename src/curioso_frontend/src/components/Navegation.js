import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { HiHome } from 'react-icons/hi';
import { HiSearch } from 'react-icons/hi';
import { FaTasks } from 'react-icons/fa';
import motokoLogo from '../../assets/motoko.png';



export const Navegation = ({ handleShowForm, handleShowSearch, handleShowHome, handleSearch }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = (e) => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="w-full xl:w-[400px] fixed h-[60px] mt-3  bottom-5  xl:top-5 left-[50%] -translate-x-[50%] z-20">
      <div className="w-full xl:w-[400px] h-[60px] relative top-0 left-0 -z-10">
        <div
          className="w-[75px] h-[75px] rounded-full  flex ring-8 ring-white items-center absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] justify-center z-20 active-bg"
          onClick={handleMenu}
        >
          <img
            src={motokoLogo}
            alt="icono-motoko"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div
          className={`bg-slate-200 rounded-xl shadow-xl absolute ${
            showMenu
              ? 'w-full xl:w-[400px] opacity-100'
              : 'w-0 overflow-hidden opacity-0'
          } h-[60px] left-[50%] -translate-x-[50%] flex items-center justify-between transition-all duration-300 ease-out`}
        >
          <div
            className="w-[35px] h-[35px] rounded-full bg-blue-400 flex items-center justify-center ml-5"
            onClick={() => {
              handleShowForm()
              handleShowHome(true)
            }}
          >
            <RiAddFill className="text-7xl" />
          </div>
          <div className="w-[35px] h-[35px] rounded-full bg-blue-400 flex items-center justify-center " onClick={() => handleShowHome(false)}>
            <HiHome className="text-2xl" />
          </div>
          <div className="w-[35px] h-[35px] rounded-full bg-blue-400 flex items-center justify-center "></div>
          <div
            className="w-[35px] h-[35px] rounded-full bg-blue-400 flex items-center justify-center"
            onClick={handleSearch}
          >
            <HiSearch className="text-2xl" />
          </div>
          <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center mr-5" onClick={() => {
            handleShowHome(true)
          }}>
            <FaTasks className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
