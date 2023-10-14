import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Title is required',
    }),
    thumbnail: z.string({
      required_error: 'Thumbnail image is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    rating: z.array(z.string()).optional(),
    category: z.string({
      required_error: 'Category is required',
    }),
    time: z.string({
      required_error: 'Time is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    price: z.number().optional(),
  }),
});

const updateSerive = z.object({
  body: z.object({
    name: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    rating: z.array(z.string()).optional(),
    category: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const ServiceValidation = {
  createService,
  updateSerive,
};
