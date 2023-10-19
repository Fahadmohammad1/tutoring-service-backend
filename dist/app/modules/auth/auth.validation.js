"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'FirstName is required',
        }),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string({
            required_error: 'LastName is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AuthValidation = {
    create,
};
