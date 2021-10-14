import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "../../icons/index";
import {
  deleteService,
  getAllService,
  postService,
  updateService,
} from "../../services";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import ReactHtmlParser from "react-html-parser";
import { LoaderSpinner } from '../index'

const Categories = () => {
  const [categories, setCategories] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(false)

  const close = () => {
    setCategoriesData({});
    setModalOpen(false);
  };
  const open = (category) => {
    setCategoriesData(category);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    let newCategoriesList;
    if (payload.type === "delete") {
      await deleteService(`categories/${payload.data.item.id}`);

      newCategoriesList = categories.filter(
        (category) => category.id !== payload.data.item.id
      );

      setCategories(newCategoriesList);
    } else {
      //? Si el payload no llega con un id => la actividad no existe
      const categoryExists = payload.id || false;

      if (!categoryExists) {
        //? Creo una nueva actividad
        const { data: categoryCreated } = await postService("category", {
          name: payload.name,
          description: payload.description,
        });

        newCategoriesList = categories.concat({
          id: categoryCreated.data.id,
          name: categoryCreated.data.name,
          description: categoryCreated.data.description,
        });
      } else {
        //? Caso contrario, edita la actividad en funcion del id que me llega
        await updateService(`categories/${payload.id}`, {
          name: payload.name,
          description: payload.description,
        });

        newCategoriesList = categories.map((category) => {
          if (category.id === payload.id) {
            return {
              id: category.id,
              name: payload.name,
              description: payload.description,
            };
          }

          return category;
        });
      }
    }
    setCategories(newCategoriesList);
    close();
  };

  useEffect(() => {
    setLoading(true)
    getAllService(`categories`)
    .then((res) => {
      setCategories(res.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
    });
  }, []);

  return (
    <>
    {loading ? <LoaderSpinner /> :
        <>
      <section className="border-bottom">
        <div className="table-responsive">
          <table className="caption-top table table-striped table-sm">
            <caption>
              <div className="d-flex justify-content-between">
                <div>Lista de Categorias</div>
                <div>
                  <button
                    className="btn btn btn-primary"
                    onClick={() => open({})}
                  >
                    Crear Categoría
                  </button>
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories
                ? categories.map((item) => (
                  <tr key={item.id} className='align-middle'>
                      <td>{item.name}</td>
                      <td>{ReactHtmlParser(item.description)}</td>
                      <td >
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
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            data={categoriesData}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
      </>
      }
    </>
  );
};

export default Categories;
