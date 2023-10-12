import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IService } from './service.interface';

const createService = async (
  serviceData: Service,
  user: JwtPayload
): Promise<IService | null> => {
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
      TeacherProfile: true,
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

  serviceData.userId = user.userId;
  serviceData.authorName = findAuthor?.TeacherProfile[0].fullName;
  serviceData.authorName = serviceData.authorEmail = user.email;

  const result = prisma.service.create({
    data: serviceData,
  });

  return result;
};

export const ServicesOfService = {
  createService,
};
