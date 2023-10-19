"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const addReview = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User id is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service id is required',
        }),
        rating: zod_1.z.string({
            required_error: 'Please add a rating out of 5',
        }),
        text: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    addReview,
};
