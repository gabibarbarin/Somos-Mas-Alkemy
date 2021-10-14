import React from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import './styleForm.css';

function UserForm() {

  const isAdmin = false;

  return (
    <div className="wrapper bg-white mt-sm-5">
      <h4 className="pb-4 border-bottom h4">Modificar Perfil</h4>
      <Formik
        initialValues={{ firstName: '', lastName: '', roleId: '' }}
        validate={values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Agregar nombre válido';
          }
          if (!values.lastName) {
            errors.lastName = 'Agregar apellido válido'
          }
          if (!values.roleId) {
            errors.roleId = 'Seleccionar un Rol'
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="py-2">
            <div className="row py-2">
              <div className="col-md-6">
                <label className="label" htmlFor="firstName">Nombre: </label>
              </div>
              <div className="col-md-6">
                <Field className="bg-light form-control" type="text" name="firstName" placeholder="Nombre" />
                <ErrorMessage className="text-danger" name="firstName" component="div" />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-6">
                <label className="label" htmlFor="firstName">Apellido: </label>
              </div>
              <div className="col-md-6">
                <Field className="bg-light form-control" type="text" name="lastName" placeholder="Apellido" />
                <ErrorMessage className="text-danger" name="lastName" component="div" />
              </div>
            </div>
            <div className="row py-2">
              {isAdmin === true &&
                <>
                  <div className="col-md-6">
                    <label className="label" htmlFor="firstName">Rol: </label>
                  </div>
                  <div className="col-md-6">
                    <Field className="bg-light form-control arrow" name="roleId" as="select" placeholder="Rol">
                      <option value="">-- Seleccionar --</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Usuario">Usuario</option>
                    </Field>
                    <ErrorMessage className="text-danger" name="roleId" component="div" />
                  </div>
                </>
              }
            </div>
            <div className="py-3 pb-4 border-bottom">
              <button className="btn btn-primary mr-3" type="submit" disabled={isSubmitting}>
                Modificar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;