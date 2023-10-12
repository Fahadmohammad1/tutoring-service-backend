import { z } from 'zod';

const createService = z.object({
  body: z.object({
    title: z.string({
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
    price: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createService,
};