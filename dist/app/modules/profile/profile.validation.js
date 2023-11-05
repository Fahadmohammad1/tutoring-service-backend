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
        institution: zod_1.z.string({
            required_error: 'Institution Name is required',
        }),
        standard: zod_1.z.string({
            required_error: 'Class standard is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
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
        institution: zod_1.z.string({
            required_error: 'Institution Name is required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
        designation: zod_1.z.string().optional(),
        degree: zod_1.z.string().optional(),
        yearOfExperience: zod_1.z.string().optional(),
        topicOfExpertise: zod_1.z.array(zod_1.z.string({
            required_error: 'Expertise is required',
        })),
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
        institution: zod_1.z.string().optional(),
        standard: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        degree: zod_1.z.string().optional(),
        yearOfExperience: zod_1.z.string().optional(),
        topicOfExpertise: zod_1.z.array(zod_1.z.string()).optional(),
    })
        .nonstrict(),
});
exports.ProfileValidation = {
    createStudentProfile,
    createTeacherProfile,
    updateProfile,
};
