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
    designation: z.string().optional(),
    degree: z.string().optional(),
    experienceYear: z.string({
      required_error: 'Experience year is required',
    }),
    subjectOfExpertise: z.array(z.string()),
  }),
});

const updateStudentProfile = z.object({
  body: z
    .object({
      userId: z
        .string({
          required_error: 'UserId is required',
        })
        .optional(),
      gender: z
        .string({
          required_error: 'Gender is required',
        })
        .optional(),
      contactNo: z
        .string({
          required_error: 'Contact Number is required',
        })
        .optional(),
      presentAddress: z
        .string({
          required_error: 'Present Address is required',
        })
        .optional(),
      avatar: z.string().optional(),
      institutionName: z
        .string({
          required_error: 'Institution Name is required',
        })
        .optional(),
      class: z
        .string({
          required_error: 'Class is required',
        })
        .optional(),
    })
    .optional(),
});

const updateTeacherProfile = z.object({
  body: z
    .object({
      userId: z
        .string({
          required_error: 'UserId is required',
        })
        .optional(),
      gender: z
        .string({
          required_error: 'Gender is required',
        })
        .optional(),
      contactNo: z
        .string({
          required_error: 'Contact Number is required',
        })
        .optional(),
      presentAddress: z
        .string({
          required_error: 'Present Address is required',
        })
        .optional(),
      avatar: z.string().optional(),
      institutionName: z
        .string({
          required_error: 'Institution Name is required',
        })
        .optional(),
      designation: z.string().optional(),
      degree: z.string().optional(),
      experienceYear: z
        .string({
          required_error: 'Experience year is required',
        })
        .optional(),
      subjectOfExpertise: z.array(z.string()).optional(),
    })
    .optional(),
});

export const ProfileValidation = {
  createStudentProfile,
  createTeacherProfile,
  updateStudentProfile,
  updateTeacherProfile,
};
