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
  studentPassword: string().min(8).required(),
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
      const minSubjectsCount = 1; 
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
  studentPassword: string().min(8).required()
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
      const minSubjectsCount = 1; 
      return Object.keys(value || {}).length >= minSubjectsCount;
    }
  ),
  isAdmin: boolean().required(),
});

export const homeworkSchema = object({
  schoolClass: string().required(),
  classSubject : string().required(),
  uploadDate : date().required(),
  dueDate: date().required(),
  staffId: string().required(),
  homework : mixed().required(),
  note: string().required(),
  schoolId: number().required(),
});
