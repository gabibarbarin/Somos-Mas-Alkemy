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
          <DeleteModal data={data.act} onSubmit={onSubmit} />
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
          <h4>Eliminar actividad</h4>
          <p>
            Estas seguro que deseas eliminar la actividad{" "}
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
  const [image, setImage] = useState(isEdit ? data.image : "");
  const [description, setDescription] = useState(isEdit ? data.content : "");

  return (
    <>
      <div className="modal-sms-body ">
        <div className="modal-icon create">
          <HiOutlineClipboardList />
        </div>
        <div className="w-100">
          <h4>{isEdit ? "Editar" : "Crear"} Testimonio</h4>
          <form className="mt-3">
            <div className="form-group">
              <div className="mb-3">
                <label className="form-label" htmlFor="customFile">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="customFile"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {image && (
                  <img
                    height="150px"
                    src={image.size ? URL.createObjectURL(image) : image}
                    alt={image}
                  />
                )}
              </div>

              <label className="mb-1" htmlFor="formGroupExampleInput">
                Nombre
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
                Testimonio
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
            onSubmit({
              name: title,
              content: description,
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
