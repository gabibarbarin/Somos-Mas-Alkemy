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
import { Link } from "react-router-dom";
import { LoaderSpinner } from "../index";

const NewsBackoffice = () => {
  const [modal, setModal] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [newsActData, setNewsActData] = useState({});
  const [loading, setLoading] = useState(false);

  const close = () => {
    setNewsActData({});
    setModal(false);
  };

  const open = data => {
    setNewsActData(data);
    setModal(true);
  };

  useEffect(() => {
    setLoading(true);
    getAllService("news")
      .then(res => {
        setNewsData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async payload => {
    let newNewsList;

    if (payload.type === "delete") {
      await deleteService(`news/${payload.data.id}`);

      newNewsList = newsData.filter(news => news.id !== payload.data.id);
      setNewsData(newNewsList);
    } else {
      //? Si el payload no llega con un id => la actividad no existe
      const newsExists = payload.id || false;

      if (!newsExists) {
        //? Creo una nueva actividad
        const formData = new FormData();
        for (let key in payload) {
          formData.append(key, payload[key]);
        }

        const { data } = await postService("news", formData, true);
        newNewsList = newsData.concat({
          id: data.data.id,
          name: data.data.name,
          image: data.data.image,
          content: data.data.content,
          type: data.data.type,
        });
      } else {
        //? Caso contrario, edita la actividad en funcion del id que me llega
        const formData = new FormData();
        for (let key in payload) {
          formData.append(key, payload[key]);
        }

        const { data } = await updateService(
          `news/${payload.id}`,
          formData,
          true
        );

        newNewsList = newsData.map(news => {
          if (news.id === payload.id) {
            return {
              id: payload.id,
              name: payload.name,
              image: data.image,
              content: payload.content,
              type: payload.type,
            };
          }

          return news;
        });
      }
    }
    setNewsData(newNewsList);
    close();
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <section className='border-bottom'>
            <div className='table-responsive'>
              <table className='caption-top table table-striped table-sm'>
                <caption>
                  <div className='d-flex justify-content-between'>
                    <div>Lista de Novedades</div>
                    <div>
                      <button
                        className='btn btn btn-primary'
                        onClick={() => open({})}>
                        Crear novedad
                      </button>
                    </div>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <th scope='col'>Título</th>
                    <th scope='col'>Imagen</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'></th>
                    <th scope='col'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {newsData
                    ? newsData.map(item => (
                        <tr key={item.id} className='align-middle'>
                          <Route>
                            <td>
                              <div className='link-activity' colSpan='2'>
                                <Link to={`/backoffice/news/${item.id}`}>
                                  {item.name}
                                </Link>
                              </div>
                            </td>
                          </Route>
                          <td>
                            <div>
                              <img
                                src={item.image}
                                width='90'
                                alt={item.name}
                              />
                            </div>
                          </td>
                          <td colSpan='2'>{item.type}</td>
                          <td>
                            <button
                              className='btn btn-lg btn-primary me-2'
                              onClick={() => open(item)}>
                              <BsPencil />
                            </button>
                            <button
                              className='btn btn-lg btn-danger'
                              onClick={() => open({ item, delete: true })}>
                              <BsTrash />
                            </button>
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
                data={newsActData}
                handleClose={close}
                onSubmit={handleSubmit}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default NewsBackoffice;
