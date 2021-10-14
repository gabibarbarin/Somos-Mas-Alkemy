import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllService, putService } from "../../services";
import { Alert } from "..";
import "./formEditSlide.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoaderSpinner } from "../index";

const welcomeSchema = Yup.object({
  titulo: Yup.string()
    .required("Título requerido")
    .min(20, "Mínimo 20 caracteres"),
});

const slideSchema = Yup.object().shape({
  text: Yup.string().required("Texto requerido"),
});

function FormEditSlide() {
  const onSubmitWelcome = async (values, onSubmitProps) => {
    await putService(`organizations/1`, { welcomeText: values.titulo })
      .then((response) => {
        Alert({
          title: response.data.message,
          text: "Hecho",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Alert({
          icon: "error",
          title: `${error?.message || "Ops..."}`,
          text: error?.message,
          timer: 1500,
        });
        console.log(error);
      });
    onSubmitProps.setSubmitting(false);
  };

  const [titulo, setTitulo] = useState("");

  const [slides, setSlides] = useState([]);
  const [slideFile1, setSlideFile1] = useState(null); //!importante el file
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllService("/slides")
      .then((response) => {
        setSlides(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getAllService("/organizations/1/public")
      .then((response) => {
        setTitulo(response.data.welcomeText);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const imageHandler = (e, slide) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          const editedSlides = slides.map((object) => {
            if (object.id === slide.id) {
              return {
                id: slide.id,
                text: slide.text,
                imageUrl: reader.result,
              };
            } else return object;
          });
          setSlides(editedSlides);
          setSlideFile1(file); //!important este se envia por req.files
        }
      };
    }
    reader.readAsDataURL(file);
  };

  const onSubmitSlide = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("imageUrl", slideFile1);
    formData.append("text", values.text);

    await putService(`slides/${values.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        Alert({
          title: response.data.message,
          text: "Hecho",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Alert({
          icon: "error",
          title: `${error?.message || "Ops..."}`,
          text: error?.message,
          timer: 1500,
        });
        console.log(error);
      });
    onSubmitProps.setSubmitting(false);
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="container ">
            <div className="col ">
              <Formik
                initialValues={{ titulo }}
                validationSchema={welcomeSchema}
                onSubmit={onSubmitWelcome}
                enableReinitialize={true}
              >
                {(formik) => {
                  return (
                    <Form>
                      <div className="form-group mb-3">
                        <label htmlFor="titulo" className="form-label fs-4">
                          Texto de bienvenida!{" "}
                        </label>

                        <Field id="titulo" name="titulo">
                          {(props) => {
                            const { field, meta } = props;
                            return (
                              <div>
                                <textarea
                                  type="text"
                                  name="titulo"
                                  className={
                                    "form-control form-control-sm col-md-6" +
                                    (meta.error && meta.touched
                                      ? " is-invalid"
                                      : "")
                                  }
                                  id="titulo"
                                  rows={3}
                                  {...field}
                                />
                                <ErrorMessage
                                  name="titulo"
                                  component="div"
                                  className="text-danger fs-6 fw-lighter"
                                />
                              </div>
                            );
                          }}
                        </Field>
                        <div className="col-12 m-2 d-flex justify-content-end">
                          {/* <button className="btn btn-sm btn-primary m-2" type="reset">Borrar</button> */}
                          <button
                            className="btn btn-sm btn-primary m-2 right"
                            disabled={!formik.isValid}
                            type="submit"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              {slides.map(({ id, text, imageUrl }) => {
                return (
                  <Formik
                    initialValues={{ id: id, text: text, imageUrl: imageUrl }}
                    validationSchema={slideSchema}
                    onSubmit={onSubmitSlide}
                    key={id}
                  >
                    {(props) => {
                      return (
                        <Form>
                          <div className="row  align-items-center">
                            <div className="form-group mt-3 mb-3 col-md-12 col-lg-5">
                              <label
                                htmlFor="tituloSlide"
                                className="form-label fs-4 "
                              >
                                Nombre slide {id}
                              </label>
                              <Field
                                name="text"
                                type="text"
                                className={
                                  "form-control form-control-sm mb-2" +
                                  (props.errors.text && props.touched.text
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name={`text`}
                                component="div"
                                className="text-danger fs-6 fw-lighter"
                              />

                              <div className="form-group ">
                                <label className="fw-lighter fs-5 ml-3">
                                  Imagen
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="slides.imageUrl"
                                  className={"form-control form-control-sm"}
                                  onChange={(o) =>
                                    imageHandler(o, { id, text, imageUrl })
                                  } //!esto rompe todo
                                />
                              </div>
                              <div className="col-12 m-2  d-flex justify-content-end">
                                {/* <button
                              className="btn btn-sm btn-primary m-2"
                              type="reset"
                            >
                              Borrar
                            </button> */}

                                <button
                                  className="btn btn-sm btn-primary m-2 "
                                  disabled={!props.isValid}
                                  type="submit"
                                >
                                  Guardar
                                </button>
                              </div>
                            </div>
                            {imageUrl && (
                              <div className="form-group col-md-12 col-lg-7 mb-3">
                                <div className="image-slide__container mx-auto d-block">
                                  <img
                                    className=" bd-highlight logo-image__slide"
                                    src={imageUrl}
                                    alt={text}
                                    name="slidePreview"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormEditSlide;
