import * as Yup from "yup"

export const YupCourseValidation = Yup.object().shape({
  overview: Yup.string().max(5000).required(),
  title: Yup.string()
    .max(255)
    .required()
})
