import { z } from 'zod';

const create = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'FirstName is required',
    }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: 'LastName is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  create,
};
