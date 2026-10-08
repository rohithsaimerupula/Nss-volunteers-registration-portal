import * as z from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").max(100, "Name is too long"),
  rollNumber: z.string().min(5, "Valid roll number is required.").max(20, "Roll number too long"),
  email: z.string().email("Please enter a valid email address.").max(100, "Email is too long"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
  program: z.string().min(2, "Program is required.").max(50, "Program is too long"),
  department: z.string().min(2, "Department is required.").max(50, "Department is too long"),
  year: z.string().min(1, "Year is required.").max(10, "Year is invalid"),
  section: z.string().max(10, "Section too long").optional(),
  ugPg: z.enum(["UG", "PG"], { required_error: "Please select UG or PG." }),
  interests: z.array(z.string().max(50)).min(1, "Select at least one area of interest.").max(15, "Too many interests"),
  previousExperience: z.string().max(1000, "Experience description is too long").optional(),
  motivation: z.string().min(10, "Please briefly explain why you want to join.").max(1000, "Motivation is too long"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to participate in NSS activities." }),
  }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
