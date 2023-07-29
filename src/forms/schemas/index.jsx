import { object, string, number, boolean } from "yup";

export const staffLoginSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
  isAdmin: boolean(),
});

export const staffSignupSchema = object({
  name: string().min(2).required(),
  email: string().email().required(),
  password: string().min(8).required(),
  schoolId: number().test(
    "len",
    "School ID must be exactly 8 characters",
    (val) => (typeof val === 'number' && val.toString().length === 8)
  ).required(),
});

export const studentLoginSchema = object({
  studentId: number().test(
    "len",
    "Student ID must be exactly 12 characters",
    (val) => (typeof val === 'number' && val.toString().length === 12)
  ).required(),
  password: string().min(8).required(),
});