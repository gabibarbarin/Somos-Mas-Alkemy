import React, { useState } from "react";
import { ModalModify, ModalDelete } from "../Modal";
import { AnimatePresence } from "framer-motion";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { fillUserData, resetUserData } from "../../../store/authSlice";
import { deleteService, updateService } from "../../../services";
import { useHistory } from "react-router";
import { Alert } from "../..";

const Information = () => {
  const [modalModify, setModalModify] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { isLogged, user } = useSelector((state) => state.user_auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const closeModify = () => {
    setModalModify(false);
  };

  const closeDelete = () => {
    setModalDelete(false);
  };

  const openModify = () => {
    setModalModify(true);
  };
  const openDelete = () => {
    setModalDelete(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (payload.type === "delete") {
        const response = await deleteService(`users/${payload.data.id}`);
        if (response.status === 200) {
          dispatch(resetUserData());
          await Alert({
            icon: "info",
            title: `Usuario eliminado exitosamente`,
            showConfirmButton: false,
            timer: 1900,
          });

          history.push("/");
        }
      } else {
        const formData = new FormData();
        for (let key in payload) {
          formData.append(key, payload[key]);
        }

        const userUpdated = await updateService(
          `auth/${payload.id}`,
          formData,
          true
        );
        localStorage.setItem("token_id", userUpdated?.token);
        dispatch(fillUserData(userUpdated.user));
        closeModify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div className="d-flex flex-column w50vw screen750px">
        <div className="d-flex flex-wrap flex-column justify-content-around bg-primary rounded p-5 m-1">
          <div className="d-flex justify-content-center mb-3">
            <img
              className="rounded-circle align-self-center img-thumbnail w150 h150 picItemResp"
              style={{ objectFit: "cover" }}
              src={user?.image}
              alt="profile"
            />
          </div>
          <div className="d-flex flex-column flex-wrap">
            <div className="d-flex flex-column align-items-center">
              <p className="smokeWhite">Nombre:</p>
              <p className="fontSize-1 brightWhite fontResp">
                {user?.firstName}
              </p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <p className="smokeWhite">Apellido:</p>
              <p className="fontSize-1 brightWhite fontResp">
                {user?.lastName}
              </p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <p className="smokeWhite">Email:</p>
              <p className="fontSize-1 brightWhite fontResp">{user?.email}</p>
            </div>
            <div className="d-flex flex-wrap justify-content-around">
              <div className="margin365px">
                <button
                  onClick={() => openModify()}
                  className="btn btn-warning"
                >
                  Modificar Perfil
                </button>
              </div>
              <div className="">
                <button onClick={() => openDelete()} className="btn btn-danger">
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence inital={false} exitBeforeEnter={true}>
        {modalModify && (
          <ModalModify
            modal={modalModify}
            handleClose={closeModify}
            onSubmit={handleSubmit}
          />
        )}
        {modalDelete && (
          <ModalDelete
            modal={modalModify}
            handleClose={closeDelete}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Information;
