import * as z from "zod";

export const stepOneSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  rollNumber: z
    .string()
    .trim()
    .min(4, "Please enter a valid college roll number.")
    .max(25, "Roll number is too long.")
    .regex(/^[a-zA-Z0-9]+$/, "Roll number should only contain letters and numbers."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(100, "Email is too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  ugPg: z.enum(["UG", "PG"], {
    required_error: "Please select whether you are in UG or PG.",
  }),
  program: z
    .string()
    .trim()
    .min(2, "Degree or program is required (e.g., B.Tech, M.Tech, MBA, MCA).")
    .max(50, "Program name is too long."),
  department: z
    .string()
    .trim()
    .min(2, "Department / Branch is required (e.g., CSE, ECE, ME, IT).")
    .max(50, "Department name is too long."),
  year: z
    .string()
    .min(1, "Please select your academic year.")
    .max(10, "Invalid academic year."),
  section: z
    .string()
    .trim()
    .max(10, "Section cannot exceed 10 characters.")
    .optional()
    .or(z.literal("")),
});

export const stepTwoSchema = z.object({
  interests: z
    .array(z.string().max(50))
    .min(1, "Please select at least one area of interest.")
    .max(10, "Maximum of 10 areas of interest permitted."),
  previousExperience: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),
  motivation: z
    .string()
    .trim()
    .max(1000, "Motivation cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must consent to the collection and use of submitted data for the NSS campaign.",
    }),
  }),
});

export const registrationSchema = stepOneSchema.merge(stepTwoSchema);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;
