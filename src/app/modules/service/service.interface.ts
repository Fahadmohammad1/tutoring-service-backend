import { TimeSlots, serviceType } from '@prisma/client';

export type IService = {
  id: string;
  userId: string;
  thumbnail: string;
  name: string;
  location: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  description: string;
  rating: string[];
  timeSlots: TimeSlots[];
  category: string;
  duration: string;
  serviceType: serviceType;
  price?: number;
  badge?: string[];
};

export type IServiceFilter = {
  search?: string | undefined;
  name?: string | undefined;
  authorName?: string | undefined;
  category?: string | undefined;
  location?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};
