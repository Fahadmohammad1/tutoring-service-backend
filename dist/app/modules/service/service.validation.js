"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const service_constants_1 = require("./service.constants");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        thumbnail: zod_1.z.string({
            required_error: 'Thumbnail image is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        reviews: zod_1.z.array(zod_1.z.object({})).optional(),
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
        duration: zod_1.z.string({
            required_error: 'Time is required',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }),
        timeSlots: zod_1.z
            .array(zod_1.z.object({
            startTime: zod_1.z.string({
                required_error: 'Start time is required',
            }),
            endTime: zod_1.z.string({
                required_error: 'End time is required',
            }),
        }))
            .optional(),
        serviceType: zod_1.z.enum([...service_constants_1.serviceType], {
            required_error: 'Service type is required',
        }),
        price: zod_1.z.number().optional(),
    }),
});
const updateSerive = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        rating: zod_1.z.array(zod_1.z.string()).optional(),
        category: zod_1.z.string().optional(),
        time: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
    }),
});
exports.ServiceValidation = {
    createService,
    updateSerive,
};
