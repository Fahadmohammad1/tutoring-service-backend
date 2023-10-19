"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidation = void 0;
const zod_1 = require("zod");
const createStudentProfile = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId is required',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present Address is required',
        }),
        avatar: zod_1.z.string().optional(),
        institutionName: zod_1.z.string({
            required_error: 'Institution Name is required',
        }),
        class: zod_1.z.string({
            required_error: 'Class is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
    }),
});
const createGuardianProfile = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId is required',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present Address is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
        avatar: zod_1.z.string().optional(),
        occupation: zod_1.z.string().optional(),
    }),
});
const createTeacherProfile = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId is required',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present Address is required',
        }),
        avatar: zod_1.z.string().optional(),
        institutionName: zod_1.z.string({
            required_error: 'Institution Name is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
        designation: zod_1.z.string().optional(),
        degree: zod_1.z.string().optional(),
        experienceYear: zod_1.z.string({
            required_error: 'Experience year is required',
        }),
        subjectOfExpertise: zod_1.z.array(zod_1.z.string()),
    }),
});
const updateProfile = zod_1.z.object({
    body: zod_1.z
        .object({
        userId: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        avatar: zod_1.z.string().optional(),
        institutionName: zod_1.z.string().optional(),
        class: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        degree: zod_1.z.string().optional(),
        experienceYear: zod_1.z.string().optional(),
        subjectOfExpertise: zod_1.z.array(zod_1.z.string()).optional(),
    })
        .nonstrict(),
});
exports.ProfileValidation = {
    createStudentProfile,
    createGuardianProfile,
    createTeacherProfile,
    updateProfile,
};
