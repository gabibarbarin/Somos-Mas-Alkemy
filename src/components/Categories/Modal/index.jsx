import React, { useState } from "react";
import Backdrop from "../Backdrop";
import { motion } from "framer-motion";
import "./style.css";
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
        onClick={(e) => e.stopPropagation()}
        className="modal-sms"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {isDelete ? (
          <DeleteModal data={data} onSubmit={onSubmit} />
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
          <h4>Eliminar categoria</h4>
          <p>
            Estas seguro que deseas eliminar la categoria{" "}
            <strong>{data.name}</strong> ? Toda la información relacionada sera
            eliminada permanentemente. Esta acción no puede deshacerse.
          </p>
        </div>
      </div>
      <div className="modal-sms-footer">
        <button
          className="btn btn-delete shadow-sm"
          onClick={() => onSubmit({ data, type: "delete" })}
        >
          Eliminar
        </button>
        <button className="btn btn-cancel shadow-sm">Cancelar</button>
      </div>
    </>
  );
};

const CreationUpdateModal = ({ onSubmit, data }) => {
  const isEdit = "name" in data;
  const [title, setTitle] = useState(isEdit ? data.name : "");
  const [description, setDescription] = useState(
    isEdit ? data.description : ""
  );

  return (
    <>
      <div className="modal-sms-body ">
        <div className="modal-icon create">
          <HiOutlineClipboardList />
        </div>
        <div className="w-100">
          <h4>{isEdit ? "Editar" : "Crear"} categoria</h4>
          <form className="mt-3">
            <div className="form-group">
              <label className="mb-1" htmlFor="formGroupExampleInput">
                Título
              </label>
              <input
                type="text"
                value={title}
                className="form-control"
                id="formGroupExampleInput"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group my-4">
              <label className="mb-1" htmlFor="formGroupExampleInput2">
                Descripción
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  setDescription(editor.getData());
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-sms-footer">
        <button className="btn btn-cancel shadow-sm">Cancelar</button>
        <button
          className="btn btn-confirm shadow-sm"
          onClick={() =>
            onSubmit({ name: title, description: description, id: data.id })
          }
        >
          Guardar
        </button>
      </div>
    </>
  );
};
