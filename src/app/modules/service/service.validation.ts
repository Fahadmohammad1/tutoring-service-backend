import { z } from 'zod';
import { serviceType } from './service.constants';

const createService = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Name is required',
    }),
    thumbnail: z.string({
      required_error: 'Thumbnail image is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    reviews: z.array(z.object({})).optional(),
    category: z.string({
      required_error: 'Category is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    timeSlots: z
      .array(
        z.object({
          startTime: z.string({
            required_error: 'Start time is required',
          }),
          endTime: z.string({
            required_error: 'End time is required',
          }),
        })
      )
      .optional(),

    type: z.enum([...serviceType] as [string, ...string[]], {
      required_error: 'Service type is required',
    }),
    fee: z.number().optional(),
  }),
});

const updateSerive = z.object({
  body: z.object({
    title: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    rating: z.array(z.string()).optional(),
    category: z.string().optional(),
    location: z.string().optional(),
    fee: z.number().optional(),
  }),
});

export const ServiceValidation = {
  createService,
  updateSerive,
};
