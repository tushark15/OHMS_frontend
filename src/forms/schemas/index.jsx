import { object, string, number, boolean, array, date, mixed } from "yup";

export const staffLoginSchema = object({
  staffEmail: string().email().required(),
  staffPassword: string().min(8).required(),
});

export const staffSignupSchema = object({
  staffName: string().min(2).required(),
  staffEmail: string().email().required(),
  staffPassword: string().min(8).required(),
  schoolId: number()
    .test(
      "len",
      "School ID must be exactly 8 characters",
      (val) => typeof val === "number" && val.toString().length === 8
    )
    .required(),
  isAdmin: boolean().required(),
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
  schoolId: number()
    .test(
      "len",
      "School ID must be exactly 8 characters",
      (val) => typeof val === "number" && val.toString().length === 8
    )
    .required(),
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
  studentClass: string().required(),
  schoolId: number().required(),
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
  isAdmin: boolean().required(),
});

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const homeworkSchema = object({
  files: mixed()
    .test("fileSize", "File Size is too large", (value) => {
      if (value && value?.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 5242880) {
            return false;
          }
        }
      }
      return true;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (
            value[i].type != "image/png" &&
            value[i].type != "image/jpg" &&
            value[i].type != "image/jpeg"
          ) {
            return false;
          }
        }
      }
      return true;
    }),
});
