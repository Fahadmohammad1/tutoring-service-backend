export type IService = {
  id: string;
  userId: string;
  thumbnail: string;
  name: string;
  authorName: string;
  authorEmail: string;
  description: string;
  rating: string[];
  category: string;
  time: string;
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
