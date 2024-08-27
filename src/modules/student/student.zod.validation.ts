import { z } from "zod";

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can not be more than 20 characters")
    .min(1, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Last name is not valid",
    }),
});

// Gurdian schema
const gurdianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required"),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, "Father's contact number is required"),
  fatherOccupation: z.string().trim().min(1, "Father's occupation is required"),
  motherName: z.string().trim().min(1, "Mother's name is required"),
  motherContactNo: z
    .string()
    .trim()
    .min(1, "Mother's contact number is required"),
  motherOccupation: z.string().trim().min(1, "Mother's occupation is required"),
});

// LocalGurdian schema
const localGurdianValidationSchema = z.object({
  name: z.string().trim().min(1, "Local guardian's name is required"),
  occupation: z
    .string()
    .trim()
    .min(1, "Local guardian's occupation is required"),
  contactNo: z
    .string()
    .trim()
    .min(1, "Local guardian's contact number is required"),
  address: z.string().trim().min(1, "Local guardian's address is required"),
});

// Student schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "{VALUE} is not valid" }),
      }),
      dateOfBirth: z.string().trim().optional(),
      email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Email is not a valid email type"),
      contactNo: z.string().trim().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      permanentAddress: z
        .string()
        .trim()
        .min(1, "Permanent address is required"),
      presentAddress: z.string().trim().min(1, "Present address is required"),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      profileImg: z.string().trim().optional(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
};
