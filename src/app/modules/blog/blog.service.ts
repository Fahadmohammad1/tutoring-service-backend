import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBlog = async (data: Blog): Promise<Blog> => {
  return await prisma.blog.create({
    data,
  });
};
const getAllBlog = async () => {
  return await prisma.blog.findMany({});
};
const getSingleBlog = async (id: string) => {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
  });
};
const updateBlog = async (id: string, data: Partial<Blog>) => {
  return await prisma.blog.update({
    where: {
      id,
    },
    data,
  });
};
const deleteBlog = async (id: string) => {
  return await prisma.blog.delete({
    where: {
      id,
    },
  });
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
