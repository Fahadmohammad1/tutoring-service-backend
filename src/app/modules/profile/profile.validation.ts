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
    institution: z.string({
      required_error: 'Institution Name is required',
    }),
    standard: z.string({
      required_error: 'Class standard is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});

const createTeacherProfile = z.object({
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
    institution: z.string({
      required_error: 'Institution Name is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
    designation: z.string().optional(),
    degree: z.string().optional(),
    yearOfExperience: z.string().optional(),
    topicOfExpertise: z.array(
      z.string({
        required_error: 'Expertise is required',
      })
    ),
  }),
});

const updateProfile = z.object({
  body: z
    .object({
      userId: z.string().optional(),
      gender: z.string().optional(),
      contactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      avatar: z.string().optional(),
      institution: z.string().optional(),
      standard: z.string().optional(),
      designation: z.string().optional(),
      degree: z.string().optional(),
      yearOfExperience: z.string().optional(),
      topicOfExpertise: z.array(z.string()).optional(),
    })
    .nonstrict(),
});

export const ProfileValidation = {
  createStudentProfile,
  createTeacherProfile,
  updateProfile,
};
