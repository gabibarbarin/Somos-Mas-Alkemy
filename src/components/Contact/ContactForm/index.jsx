import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formSchema } from "./validations";
import "./style.css";
import { postService } from "../../../services";
import { Alert } from "../..";

const ContactForm = () => {
  return (
    <Formik
      //Valores iniciales de los inputs
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      //Validaciones importadas de validations.js
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        resetForm();

        //Almacenado de los datos del usuario en espera del servicio de peticiones HTTP
        const userData = {
          name: values.name,
          email: values.email,
          message: values.message,
        };
        postService("contacts", userData)
          .then((success) =>
            Alert({
              title: `Gracias por contactarte con nosotros!`,
              text: "Hecho",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .catch((error) =>
            Alert({
              icon: "error",
              title: `${error.data?.mesagge || "Ops..."}`,
              text: error.data?.msg,
            })
          );
      }}
    >
      {({ errors }) => (
        //Formulario de contacto
        <div className="col-12 col-md-7 m-auto">
          <Form className="row g-3 border rounded shadow ps-3 pe-3 pb-4 pt-4 bg-white">
            <div className="col-12 col-md-6">
              <Field
                type="text"
                className="form-control border rounded pb-2 pt-2"
                id="name"
                name="name"
                placeholder="Nombre"
              />

              <ErrorMessage
                name="name"
                component={() => (
                  <div className="float-start text-danger text-error text-start">
                    {errors.name}
                  </div>
                )}
              />
            </div>

            <div className="col-12 col-md-6">
              <Field
                type="email"
                className="form-control border rounded pb-2 pt-2"
                id="email"
                name="email"
                placeholder="Email de contacto"
              />

              <ErrorMessage
                name="email"
                component={() => (
                  <div className="float-start text-danger text-error text-start">
                    {errors.email}
                  </div>
                )}
              />
            </div>

            <div className="col-12">
              <Field
                as="textarea"
                className="form-control border pb-5 pt-2"
                id="message"
                name="message"
                placeholder="Mensaje..."
              />

              <ErrorMessage
                name="message"
                component={() => (
                  <div className="float-start text-danger text-error text-start">
                    {errors.message}
                  </div>
                )}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-3 m-auto">
              <button
                type="submit"
                className="btn btn-primary float-center w-100 p-2 mt-3"
              >
                Enviar
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;
