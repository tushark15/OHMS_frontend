import { object, string, number, boolean, array, date } from "yup";
import { subjects } from "../SchoolForm";
import { classes } from "../SchoolForm";

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
    .min(1, "At least one class must be selected")
    .required("At least one class must be selected"),
  classSubjects: object().test(
    "min-subjects",
    "Minimum of 1 subjects required",
    (value) => {
      const minSubjectsCount = 1; // Set your desired minimum count
      return Object.keys(value || {}).length >= minSubjectsCount;
    }
  ),
});

export const studentSchema = object({
  studentName: string().min(2).required(),
  studentEmail: string().email().required(),
  studentContact: number()
    .test(
      "len",
      "Contact Number must be exactly 8 or 10 characters",
      (val) =>
        typeof val === "number" &&
        (val.toString().length === 8 || val.toString().length === 10)
    )
    .required(),
  studentAddress: string().required(),
  studentId: number()
    .test(
      "len",
      "School ID must be exactly 12 characters",
      (val) => typeof val === "number" && val.toString().length === 12
    )
    .required(),
  studentDOB: date()
    .required()
    .max(
      new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000),
      "Student must be older than 3 years"
    ),
  class: string().required(),
});

export const staffSchema = object({
  staffName: string().min(2).required(),
  staffEmail: string().email().required(),
  staffPassword: string().min(8).required(),
  schoolId: number().required(),
  staffClasses: array()
    .min(1, "At least one class must be selected")
    .required("At least one class must be selected"),
  staffSubjects: object().test(
    "min-subjects",
    "Minimum of 1 subjects required",
    (value) => {
      const minSubjectsCount = 1; // Set your desired minimum count
      return Object.keys(value || {}).length >= minSubjectsCount;
    }
  ),
});
