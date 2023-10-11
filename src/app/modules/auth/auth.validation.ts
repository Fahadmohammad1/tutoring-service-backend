import { z } from 'zod';

const roles = ['user', 'admin'];

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
    avatar: z.string({
      required_error: 'Profile Image is required',
    }),
    role: z.enum([...roles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    contactNo: z.string({
      required_error: 'Contact No is required',
    }),
    presentAddress: z.string({
      required_error: 'Address is required',
    }),
  }),
});

export const AuthValidation = {
  create,
};
