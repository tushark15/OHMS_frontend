import { object, string, number, boolean, array } from "yup";
import { subjects } from "../ClassAndSubject";
import { classes } from "../schoolForm";

export const staffLoginSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
  isAdmin: boolean(),
});

export const staffSignupSchema = object({
  name: string().min(2).required(),
  email: string().email().required(),
  password: string().min(8).required(),
  schoolId: number()
    .test(
      "len",
      "School ID must be exactly 8 characters",
      (val) => typeof val === "number" && val.toString().length === 8
    )
    .required(),
});

export const studentLoginSchema = object({
  studentId: number()
    .test(
      "len",
      "Student ID must be exactly 12 characters",
      (val) => typeof val === "number" && val.toString().length === 12
    )
    .required(),
  password: string().min(8).required(),
});

export const schoolSchema = object({
  schoolName: string().required("School Name is required"),
  schoolAddress: string().required("School Address is required"),
  schoolContact: number()
    .test(
      "len",
      "Contact Number must be exactly 8 or 10 characters",
      (val) =>
        typeof val === "number" &&
        (val.toString().length === 8 || val.toString().length === 10)
    )
    .required(),
  schoolEmail: string().email().required("School Email is required"),
  schoolEmailSuffix: string()
    .test(
      "valid-suffix",
      "Invalid email suffix. Suffix should be in the form 'example.in'",
      (val) => /^[^.]+\..+$/.test(val)
    )
    .required("School Email Suffix is required"),
  schoolClasses: array()
    .of(
      object({
        value: string().oneOf(
          classes.map((Class) => Class.value),
          "Invalid Class Selected"
        ),
      })
    )
    .min(1, "At least one class must be selected")
    .required("At least one class must be selected"),
  classSubjects: array()
    .of(
      object({
        value: string().oneOf(
          subjects.map((subject) => subject.value),
          "Invalid Subject Selected"
        ),
      })
    )
    .min(1, "At least one subject must be selected")
    .required("At least one subject must be selected"),
});
