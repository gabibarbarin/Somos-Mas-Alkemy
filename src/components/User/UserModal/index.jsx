import React, { useState } from "react";
import Backdrop from "../../Activities/Backdrop";
import { motion } from "framer-motion";
import {
  HiOutlineExclamation,
  HiX,
  HiOutlineClipboardList,
} from "../../../icons";

const dropIn = {
  hidden: {
    y: "-20vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 32,
      stiffness: 500,
    },
  },
  exit: {
    y: "-20vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, data, onSubmit }) => {
  const isDelete = data.delete || false;

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className='modal-sms'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'>
        {isDelete ? (
          <DeleteModal data={data.user} onSubmit={onSubmit} />
        ) : (
          <EditModal data={data} onSubmit={onSubmit} />
        )}
        <button className='close-button' onClick={handleClose}>
          <HiX />
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;

const DeleteModal = ({ onSubmit, data }) => {
  return (
    <>
      <div className='modal-sms-body'>
        <div className='modal-icon delete'>
          <HiOutlineExclamation />
        </div>
        <div>
          <h4>Eliminar usuario</h4>
          <p>
            Estas seguro que deseas eliminar al usuario{" "}
            <strong>
              {data.firstName} {data.lastName}
            </strong>{" "}
            ? Toda la información relacionada sera eliminada permanentemente.
            Esta acción no puede deshacerse.
          </p>
        </div>
      </div>
      <div className='modal-sms-footer'>
        <button
          className='btn btn-delete shadow-sm'
          onClick={() => onSubmit({ data, type: "delete" })}>
          Eliminar
        </button>
        <button className='btn btn-cancel shadow-sm'>Cancelar</button>
      </div>
    </>
  );
};

const EditModal = ({ onSubmit, data }) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastname] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.roleId);

  return (
    <>
      <div className='modal-sms-body '>
        <div className='modal-icon create'>
          <HiOutlineClipboardList />
        </div>
        <div className='w-100'>
          <h4>Editar usuario</h4>
          <form className='mt-3'>
            <div className='form-group'>
              <label className='mb-1' htmlFor='firstName'>
                Nombre
              </label>
              <input
                type='text'
                value={firstName}
                className='form-control'
                id='firstName'
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className='form-group mt-2'>
              <label className='mb-1' htmlFor='lastName'>
                Apellido
              </label>
              <input
                type='text'
                value={lastName}
                className='form-control'
                id='lastName'
                onChange={e => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className='form-group mt-2'>
              <label className='mb-1' htmlFor='email'>
                Email
              </label>
              <input
                disabled
                type='email'
                value={email}
                className='form-control'
                id='email'
              />
            </div>
            <div className='form-group mt-2 mb-4'>
              <label htmlFor='rol'>Rol</label>
              <select
                style={{ borderRadius: "10px" }}
                className='form-select'
                aria-label='select role'
                onChange={e => setRole(e.target.value)}>
                <option defaultValue value={role}>
                  {role === 1 ? "ADMIN" : "STANDARD"}
                </option>
                <option value={role === 1 ? 2 : 1}>
                  {role === 1 ? "STANDARD" : "ADMIN"}
                </option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className='modal-sms-footer'>
        <button className='btn btn-cancel shadow-sm'>Cancelar</button>
        <button
          className='btn btn-confirm shadow-sm'
          onClick={() =>
            onSubmit({ id: data.id, firstName, lastName, roleId: Number(role) })
          }>
          Guardar
        </button>
      </div>
    </>
  );
};
