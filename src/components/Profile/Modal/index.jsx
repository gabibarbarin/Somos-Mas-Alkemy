import React, { useState } from "react";
import Backdrop from "../../Activities/Backdrop";
import { motion } from "framer-motion";
import "../../Activities/style.css";
import {
  HiOutlineExclamation,
  HiX,
  HiOutlineClipboardList,
} from "../../../icons";
import { useSelector } from "react-redux";

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

const ModalModify = ({ handleClose, onSubmit }) => {
  const { user } = useSelector(state => state.user_auth);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className='modal-sms'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'>
        <UpdateModal data={user} onSubmit={onSubmit} />
        <button className='close-button' onClick={handleClose}>
          <HiX />
        </button>
      </motion.div>
    </Backdrop>
  );
};

const ModalDelete = ({ handleClose, onSubmit }) => {
  const { user } = useSelector(state => state.user_auth);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className='modal-sms'
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'>
        <DeleteModal data={user} onSubmit={onSubmit} />
        <button className='close-button' onClick={handleClose}>
          <HiX />
        </button>
      </motion.div>
    </Backdrop>
  );
};

const DeleteModal = ({ onSubmit, data }) => {
  return (
    <>
      <div className='modal-sms-body'>
        <div className='modal-icon delete'>
          <HiOutlineExclamation />
        </div>
        <div>
          <h4>Eliminar Novedad</h4>
          <p>
            Estas seguro que deseas eliminar el perfil de{" "}
            <strong>{data.firstName}</strong> ? Toda la información relacionada
            sera eliminada permanentemente. Esta acción no puede deshacerse.
          </p>
        </div>
      </div>
      <div className='d-flex justify-content-center modal-sms-footer'>
        <button
          className='btn btn-delete shadow-sm'
          onClick={() => onSubmit({ data, type: "delete" })}>
          Eliminar
        </button>
      </div>
    </>
  );
};

const UpdateModal = ({ onSubmit, data }) => {
  const [id, setId] = useState(data.id);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [imagePreview, setImagePreview] = useState(data.image);
  const [image, setImage] = useState()

  return (
    <>
      <div className='modal-sms-body '>
        <div className='modal-icon create'>
          <HiOutlineClipboardList />
        </div>
        <div className='w-100'>
          <h4>Editar Perfil</h4>
          <form className='mt-3'>
            <div className='form-group'>
              <label className='mb-1' htmlFor='formGroupExampleInput'>
                Nombre
              </label>
              <input
                type='text'
                value={firstName}
                className='form-control'
                id='formGroupExampleInput'
                onChange={event => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div className='form-group my-4'>
              <label className='mb-1' htmlFor='formGroupExampleInput3'>
                Apellido
              </label>
              <input
                type='text'
                name='category'
                className='form-control'
                value={lastName}
                onChange={event => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div className='mt-3'>
              <label className='form-label' htmlFor='customFile'>
                Imagen
              </label>
              <input
                type='file'
                name='image'
                className='form-control'
                onChange={e => setImage(e.target.files[0])}
                id='customFile'
              />
            </div>
            {image && (
              <div className='d-flex justify-content-center mt-1 mb-3 bg-white rounded border'>
                <img
                  height='150px'
                  src={image.size ? URL.createObjectURL(image) : image}
                  alt={image}
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <div className='d-flex justify-content-center modal-sms-footer mt-3'>
        <button
          className='btn btn-confirm shadow-sm'
          onClick={() =>
            onSubmit({
              id: id,
              firstName: firstName,
              lastName: lastName,
              image: image ? image : imagePreview,
            })
          }>
          Guardar
        </button>
      </div>
    </>
  );
};

export { ModalModify, ModalDelete };
