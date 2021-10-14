import React, { useState } from "react";
import Backdrop from "../../Activities/Backdrop";
import { motion } from "framer-motion";
import "./style.css";
import { HiOutlineExclamation, HiX } from "../../../icons";

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
        <DeleteModal data={data} onSubmit={onSubmit} />
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
          <h4>Eliminar contacto</h4>
          <p>
            Estas seguro que deseas eliminar el contacto{" "}
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
