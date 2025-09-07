import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "A valid email is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type SignupData = z.infer<typeof SignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
