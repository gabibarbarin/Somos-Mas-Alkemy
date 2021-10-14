import React, { useState } from "react";
import Backdrop from "../../Activities/Backdrop";
import { motion } from "framer-motion";
import "../../Activities/style.css";
import {
  HiOutlineExclamation,
  HiX,
  HiOutlineClipboardList,
} from "../../../icons";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        onClick={(e) => e.stopPropagation()}
        className="modal-sms"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {isDelete ? (
          <DeleteModal data={data.item} onSubmit={onSubmit} />
        ) : (
          <CreationUpdateModal data={data} onSubmit={onSubmit} />
        )}
        <button className="close-button" onClick={handleClose}>
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
      <div className="modal-sms-body">
        <div className="modal-icon delete">
          <HiOutlineExclamation />
        </div>
        <div>
          <h4>Eliminar Miembro</h4>
          <p>
            Estas seguro que deseas eliminar el miembro{" "}
            <strong>{data.name}</strong> ? Toda la información relacionada sera
            eliminada permanentemente. Esta acción no puede deshacerse.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center modal-sms-footer">
        <button
          className="btn btn-delete shadow-sm"
          onClick={() => onSubmit({ data, type: "delete" })}
        >
          Eliminar
        </button>
      </div>
    </>
  );
};

const CreationUpdateModal = ({ onSubmit, data }) => {
  const isEdit = "name" in data;
  const [name, setName] = useState(isEdit ? data.name : "");
  const [image, setImage] = useState(isEdit ? data.image : "");
  return (
    <>
      <div className="modal-sms-body ">
        <div className="modal-icon create">
          <HiOutlineClipboardList />
        </div>
        <div className="w-100">
          <h4>{isEdit ? "Editar" : "Crear"} Miembro</h4>
          <form className="mt-3">
            <div className="form-group">
              <label className="mb-1" htmlFor="formGroupExampleInput">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                className="form-control"
                id="formGroupExampleInput"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            {image && (
              <div className="d-flex justify-content-center">
                <img
                  height="150px"
                  src={image.size ? URL.createObjectURL(image) : image}
                  alt={image}
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label" htmlFor="customFile">
                Imagen
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(event) => {
                  setImage(event.target.value);
                }}
                id="customFile"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center modal-sms-footer">
        <button
          className="btn btn-confirm shadow-sm"
          onClick={() =>
            onSubmit({
              name: name,
              image: image,
              id: data.id,
            })
          }
        >
          Guardar
        </button>
      </div>
    </>
  );
};
