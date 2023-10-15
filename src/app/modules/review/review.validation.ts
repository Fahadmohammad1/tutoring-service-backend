import { z } from 'zod';

const addReview = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    serviceId: z.string({
      required_error: 'Service id is required',
    }),
    rating: z.string({
      required_error: 'Please add a rating out of 5',
    }),
    text: z.string().optional(),
  }),
});

export const ReviewValidation = {
  addReview,
};
