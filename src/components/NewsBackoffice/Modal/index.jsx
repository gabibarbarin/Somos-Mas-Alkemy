import React, { useState } from "react";
import Backdrop from "../../Activities/Backdrop";
import { motion } from "framer-motion";
import "../../Activities/style.css";
import {
  HiOutlineExclamation,
  HiX,
  HiOutlineClipboardList,
} from "../../../icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
          <DeleteModal data={data.item} onSubmit={onSubmit} />
        ) : (
          <CreationUpdateModal data={data} onSubmit={onSubmit} />
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
          <h4>Eliminar Novedad</h4>
          <p>
            Estas seguro que deseas eliminar la novedad{" "}
            <strong>{data.name}</strong> ? Toda la información relacionada sera
            eliminada permanentemente. Esta acción no puede deshacerse.
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

const CreationUpdateModal = ({ onSubmit, data }) => {
  const isEdit = "name" in data;
  const [name, setName] = useState(isEdit ? data.name : "");
  const [content, setContent] = useState(isEdit ? data.content : "");
  const [type, setType] = useState(isEdit ? data.type : "");
  const [image, setImage] = useState(isEdit ? data.image : "");

  return (
    <>
      <div className='modal-sms-body '>
        <div className='modal-icon create'>
          <HiOutlineClipboardList />
        </div>
        <div className='w-100'>
          <h4>{isEdit ? "Editar" : "Crear"} Novedad</h4>
          <form className='mt-3'>
            <div className='form-group mb-3'>
              <label className='mb-1' htmlFor='formGroupExampleInput'>
                Título
              </label>
              <input
                type='text'
                value={name}
                className='form-control'
                id='formGroupExampleInput'
                onChange={event => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor='customFile'>
                Imagen
              </label>
              <input
                type='file'
                name='image'
                className='form-control'
                onChange={e => setImage(e.target.files[0])}
                // onChange={(event) => {
                //   setImage(event.target.value);
                // }}
                id='customFile'
              />
            </div>
            {image && (
              <div className='d-flex justify-content-center'>
                <img
                  height='150px'
                  src={image.size ? URL.createObjectURL(image) : image}
                  alt={image}
                />
              </div>
            )}
            <div className='form-group mb-3'>
              <label className='mb-1' htmlFor='formGroupExampleInput2'>
                Contenido
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  setContent(editor.getData());
                }}
              />
            </div>
            <div className='form-group my-4'>
              <label className='mb-1' htmlFor='formGroupExampleInput3'>
                Categoría
              </label>
              <input
                type='text'
                name='category'
                className='form-control'
                placeholder='Categoría'
                value={type}
                onChange={event => {
                  setType(event.target.value);
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className='d-flex justify-content-center modal-sms-footer'>
        <button
          className='btn btn-confirm shadow-sm'
          onClick={() =>
            onSubmit({
              name: name,
              image: image,
              content: content,
              type: type,
              id: data.id,
            })
          }>
          Guardar
        </button>
      </div>
    </>
  );
};
