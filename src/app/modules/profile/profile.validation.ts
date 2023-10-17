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
      required_error: 'Class is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});

const createGuardianProfile = z.object({
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
    role: z.string({
      required_error: 'Role is required',
    }),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
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
    institutionName: z.string({
      required_error: 'Institution Name is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
    designation: z.string().optional(),
    degree: z.string().optional(),
    experienceYear: z.string({
      required_error: 'Experience year is required',
    }),
    subjectOfExpertise: z.array(z.string()),
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
      institutionName: z.string().optional(),
      class: z.string().optional(),
      designation: z.string().optional(),
      degree: z.string().optional(),
      experienceYear: z.string().optional(),
      subjectOfExpertise: z.array(z.string()).optional(),
    })
    .nonstrict(),
});

export const ProfileValidation = {
  createStudentProfile,
  createGuardianProfile,
  createTeacherProfile,
  updateProfile,
};
