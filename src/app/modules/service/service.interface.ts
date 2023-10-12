export type IService = {
  id: string;
  userId: string;
  thumbnail: string;
  title: string;
  authorName: string;
  authorEmail: string;
  description: string;
  rating: string[];
  category: string;
  time: string;
  price: string;
  badge?: string[];
};
