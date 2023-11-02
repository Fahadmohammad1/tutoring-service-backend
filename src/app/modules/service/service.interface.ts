import { TimeSlots, serviceStatus, serviceType } from '@prisma/client';

export type IService = {
  id: string;
  userId: string;
  thumbnail: string;
  title: string;
  location: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  description: string;
  rating: string[];
  timeSlots: TimeSlots[];
  category: string;
  type: serviceType;
  fee?: number;
  status: serviceStatus;
  badge?: string[];
};

export type IServiceFilter = {
  search?: string | undefined;
  title?: string | undefined;
  authorName?: string | undefined;
  category?: string | undefined;
  location?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};
