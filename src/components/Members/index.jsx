import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import {
  deleteService,
  getAllService,
  postService,
  updateService,
} from "../../services";
import { BsPencil, BsTrash } from "../../icons/index";
import { Route } from "react-router";
import { LoaderSpinner } from '../index'

const Members = () => {
  const [modal, setModal] = useState(false);
  const [membersData, setMembersData] = useState([]);
  const [newMembersData, setNewMembersData] = useState({});
  const [loading, setLoading] = useState(false)

  const close = () => {
    setNewMembersData({});
    setModal(false);
  };

  const open = data => {
    setNewMembersData(data);
    setModal(true);
  };

  useEffect(() => {
    setLoading(true)
    getAllService("members")
    .then((res) => {
      setMembersData(res.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
    });
  }, []);

  const handleSubmit = async payload => {
    let newMembersList;

    if (payload.type === "delete") {
      await deleteService(`members/${payload.data.id}`);

      newMembersList = membersData.filter(
        members => members.id !== payload.data.id
      );
      setMembersData(newMembersList);
    } else {
      //? Si el payload no llega con un id => la actividad no existe
      const membersExists = payload.id || false;

      if (!membersExists) {
        //? Creo una nueva actividad
        const { data } = await postService("members", {
          id: payload.id,
          name: payload.name,
          image: payload.image,
        });
        newMembersList = membersData.concat({
          id: data.data.id,
          name: data.data.name,
          image: data.data.image,
        });
      } else {
        //? Caso contrario, edita la actividad en funcion del id que me llega
        await updateService(`members/${payload.id}`, {
          name: payload.name,
          image: payload.image,
        });

        newMembersList = membersData.map(members => {
          if (members.id === payload.id) {
            return {
              id: payload.id,
              name: payload.name,
              image: payload.image,
              content: payload.content,
              type: payload.type,
            };
          }

          return members;
        });
      }
    }
    setMembersData(newMembersList);
    close();
  };

  return (
    <>
    {loading ? <LoaderSpinner /> :
        <>
      <section className="border-bottom">
        <div className="table-responsive">
          <table className="caption-top table table-striped table-sm">
            <caption>
              <div className='d-flex justify-content-between'>
                <div>Lista de miembros</div>
                <div>
                  <button
                    className='btn btn btn-primary'
                    onClick={() => open({})}>
                    Crear miembro
                  </button>
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Imagen</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {membersData
                ? membersData.map(item => (
                    <tr key={item.id} className='align-middle'>
                      <Route>
                        <td>{item.name}</td>
                      </Route>
                      <td>
                        <div>
                          <img
                            src={item.image}
                            width='90'
                            height='90'
                            alt={item.name}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-lg btn-primary me-2"
                            onClick={() => open(item)}
                          >
                            <BsPencil />
                          </button>
                          <button
                            className="btn btn-lg btn-danger"
                            onClick={() => open({ item, delete: true })}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </section>
      <AnimatePresence inital={false} exitBeforeEnter={true}>
        {modal && (
          <Modal
            modal={modal}
            data={newMembersData}
            handleClose={close}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
      </>
      }
    </>
  );
};

export default Members;
