import { z } from 'zod';

const stringMinLen = 4;
const stringMaxLen = 32;

export const loginFormSchema = z.object({
  login: z
    .string()
    .min(stringMinLen, {
      message: `Login must be more than ${stringMinLen} characters long`,
    })
    .max(stringMaxLen, {
      message: `Login cannot be more than ${stringMaxLen} characters long`,
    }),
  password: z
    .string()
    .min(stringMinLen, {
      message: `Password must be more than ${stringMinLen} characters long`,
    })
    .max(stringMaxLen, {
      message: `Password cannot be more than ${stringMaxLen} characters long`,
    }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
