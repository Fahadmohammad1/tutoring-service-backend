import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constants';
import { IService, IServiceFilter } from './service.interface';

const createService = async (
  serviceData: IService,
  user: JwtPayload
): Promise<Service | null> => {
  const findService = await prisma.service.findMany({
    where: {
      title: serviceData.title,
    },
  });

  //finding author by id using token
  const findAuthor = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      Profile: true,
    },
  });

  if (!findAuthor) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Author does not exist');
  }

  findService.map(service => {
    if (findService && service?.authorEmail === serviceData.authorEmail) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'This service is already available'
      );
    }
  });

  if (serviceData) serviceData.userId = user.userId;
  serviceData.authorName = findAuthor?.Profile[0].fullName;
  serviceData.authorEmail = findAuthor?.email;
  serviceData.authorImage = findAuthor.Profile[0].avatar;

  const result = await prisma.service.create({
    data: serviceData,
  });

  return result;
};

const myServices = async (user: JwtPayload): Promise<Service[] | null> => {
  const result = await prisma.service.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      Booking: true,
      Bookmark: true,
      Reviews: true,
      user: true,
    },
  });

  return result;
};

const getAllServices = async (
  filters: IServiceFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        if (field === 'minPrice') {
          return {
            fee: {
              gte: parseFloat(value as string),
            },
          };
        }
        if (field === 'maxPrice') {
          return {
            fee: {
              lte: parseFloat(value as string),
            },
          };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: {
      Booking: true,
      Bookmark: true,
      Reviews: true,
      user: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      Booking: true,
      Bookmark: true,
      Reviews: true,
      user: true,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>,
  user: JwtPayload
): Promise<Service | null> => {
  const findService = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (
    user.email !== findService?.authorEmail &&
    user.userId !== findService?.userId
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
  }

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteService = async (
  id: string,
  user: JwtPayload
): Promise<Service | null> => {
  const findService = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (
    user.email !== findService?.authorEmail &&
    user.userId !== findService?.userId
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
  }

  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServicesOfService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  myServices,
};
