import * as Yup from "yup";

const validCharactersEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const validCharactersName = /^[a-zA-ZÀ-ÿ\s]{1,20}$/;

export const formSchema = Yup.object({
  name: Yup.string()
    .required("Por favor ingrese un Nombre.")
    .matches(
      validCharactersName,
      "El nombre solo puede contener letras y espacios."
    ),

  email: Yup.string()
    .required("Por favor ingrese un email.")
    .email("Por favor ingrese el email correctamente.")
    .matches(
      validCharactersEmail,
      "El email solo puede contener letras, numeros, puntos, guiones y guiones bajos."
    ),

  message: Yup.string()
    .required("Por favor ingrese una clave.")
    .max(200, "El mensaje tiene un maximo de 200 caracteres."),
});
