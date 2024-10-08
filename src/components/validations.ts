import * as yup from "yup";

export const agentSchema = yup.object().shape({
  firstName: yup.string().min(2, "მინიმუმ ორი სიმბოლო"),
  lastName: yup.string().min(2, "მინიმუმ ორი სიმბოლო"),
  email: yup
    .string()
    .matches(/^[\w.%+-]+@redberry\.ge$/, "გამოიყენეთ @redberry.ge ფოსტა"),
  number: yup.string().matches(/^\d+$/, "მხოლოდ რიცხვები"),
  image: yup.mixed().required("სავალდებულოა"),
});

export const listingSchema = yup.object().shape({
  listingType: yup.number().required("აირჩიეთ ტიპი"),
  address: yup.string().min(2, "მინიმუმ ორი სიმბოლო"),
  postIndex: yup
    .number()
    .typeError("მხოლოდ რიცხვები")
    .required("მხოლოდ რიცხვები"),
  region: yup.string().required("სავალდებულოა"),
  city: yup.string().required("სავალდებულოა"),
  price: yup.number().typeError("მხოლოდ რიცხვები").required("მხოლოდ რიცხვები"),
  area: yup.number().typeError("მხოლოდ რიცხვები").required("მხოლოდ რიცხვები"),
  bed: yup
    .number()
    .typeError("მხოლოდ რიცხვები")
    .integer("მხოლოდ მთელი რიცხვები")
    .required("მხოლოდ რიცხვები"),
  description: yup
    .string()
    .test("min-words", "მინიმუმ ხუთი სიტყვა", function (value) {
      if (!value) return false;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount >= 5;
    }),
  image: yup.mixed().required("სავალდებულოა"),
  agent: yup.string().required("სავალდებულოა"),
});
