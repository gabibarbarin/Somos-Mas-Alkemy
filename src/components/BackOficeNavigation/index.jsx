import React, { useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar";

import { GoGrabber } from "../../icons";
import { useSelector } from "react-redux";

export default function BackofficeNavigation({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, user } = useSelector(state => state.user_auth);

  //? En un futuro este estado sera implementado mediante Redux, por ahora se lleva a cabo con un useState

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  return (
    <div
      // className='position-md-relative d-md-flex vh-100 '
      className='position-md-relative d-md-flex vh-100 '
      // style={{ backgroundColor: "var(--color-gray-200)" }}//esto hacia q se rompa a la derecha
      >
      {/* sidebar */}
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} user={user} />
      <button
        className={`sidebar-overlay ${isOpen ? "d-block" : "d-none"}`}
        //! ver aca
        onClick={closeSidebar}></button>

      {/* CONTENT */}
      {/* <div className='flex-grow-1 d-flex flex-column '> */}
      <div className='flex-grow-1 d-flex flex-column h-100 w-100' 
      // style={{ backgroundColor: "yellow" }}
      style={{ backgroundColor: "var(--color-gray-200)" }}//esto arregla el desbordamiento de la tabla user que se rompe a la derecha
      >
        {/* HEADER */}
        <div
          id='header'
          className=' d-md-none d-flex justify-content-between shadow-sm '
          >
          {/* className=' d-md-none d-flex justify-content-between shadow-sm h-100'> */}
          <button onClick={openSidebar}>
            <GoGrabber />
          </button>
          <div className='px-3'>
            <img
              src={user.image}
              className='user-avatar'
              alt=''
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        {/* <div className='main-content d-flex flex-column position-relative'> */}
        <div className='main-content d-flex flex-column position-relative vh-100 '>
          {children}
        </div>
      </div>
    </div>
  );
}
