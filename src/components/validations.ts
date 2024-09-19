import * as yup from "yup";

export const agentSchema = yup.object().shape({
  firstName: yup.string().min(2, "მინიმუმ ორი სიმბოლო"),
  lastName: yup.string().min(2, "მინიმუმ ორი სიმბოლო"),
  email: yup
    .string()
    .matches(/^[\w.%+-]+@redberry\.ge$/, "გამოიყენეთ @redberry.ge ფოსტა"),
  number: yup
    .string()
    .matches(/^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/, "მხოლოდ რიცხვები"),
});
