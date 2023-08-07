/* Validation for each input of profile form */
import * as Yup from "yup"

const profileYupObject = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),

  username: Yup.string()
    .max(255)
    .required("Name is required"),
})

export { profileYupObject }
