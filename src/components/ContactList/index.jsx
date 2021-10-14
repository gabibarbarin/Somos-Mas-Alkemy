import React, { useEffect, useState } from "react";
import { LoaderSpinner } from "../index";
import { BsTrash } from "../../icons/index";
import { AnimatePresence } from "framer-motion";
import { deleteService, getAllService } from "../../services";
import Modal from "./Modal";

const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [newContactData, setNewContactData] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const close = () => {
    setNewContactData({});
    setModal(false);
  };

  const open = (data) => {
    setNewContactData(data);
    setModal(true);
  };

  useEffect(() => {
    setLoading(true);
    getAllService("contacts")
      .then((res) => {
        setContactList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (payload) => {
    let newContactList;
    await deleteService(`contacts/${payload.data.item.id}`);
    newContactList = contactList.filter(
      (contact) => contact.id !== payload.data.item.id
    );
    setContactList(newContactList);
    contactList.map((item) =>
      console.log(item.id, item.name, item.email, item.message)
    );
    close();
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="container">
            <div className="card table-responsive m-3 p-2">
              {contactList.message ? (
                <h5>{contactList.message}</h5>
              ) : (
                <table className="table table-hover table-striped my-3 ">
                  <thead>
                    <tr className="align-middle">
                      <th scope="col">Nombre</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mensaje</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactList.length > 0 &&
                      contactList.map((item) => (
                        <tr key={item.id} className="align-middle">
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.message}</td>
                          <td>
                            <button
                              className="btn btn-lg btn-danger"
                              onClick={() => open({ item, delete: true })}
                            >
                              <BsTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
            <AnimatePresence inital={false} exitBeforeEnter={true}>
              {modal && (
                <Modal
                  modal={modal}
                  data={newContactData}
                  handleClose={close}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
};

export default ContactList;
