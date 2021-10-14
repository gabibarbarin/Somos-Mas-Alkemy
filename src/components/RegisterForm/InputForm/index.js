import React from "react";
import { Field, ErrorMessage } from "formik";
import "../style.css";

const InputRegisterForm = ({
  name,
  type,
  id,
  placeholder,
  errorsName,
  style,
}) => {
  return (
    <div className={style}>
      <Field
        type={type}
        className="form-control border rounded"
        id={id}
        name={name}
        placeholder={placeholder}
      />

      <ErrorMessage
        name={name}
        component={() => (
          <div className="float-start text-danger font-error fw-lighter">
            {errorsName}
          </div>
        )}
      />
    </div>
  );
};
export default InputRegisterForm;
