import { z } from 'zod';

const createStudentProfile = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    presentAddress: z.string({
      required_error: 'Present Address is required',
    }),
    avatar: z.string().optional(),
    institutionName: z.string({
      required_error: 'Institution Name is required',
    }),
    class: z.string({
      required_error: 'Present Address is required',
    }),
  }),
});

export const ProfileValidation = {
  createStudentProfile,
};
