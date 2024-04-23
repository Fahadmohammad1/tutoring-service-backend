import { Profile } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUser } from '../auth/auth.interface';
import { IProfile } from './profile.interface';

const createProfile = async (
  data: IProfile,
  userId: string
): Promise<Profile | null> => {
  const { role, ...profileData } = data;
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const { firstName, lastName } = findUser;

  // setting user fullname for profile
  profileData.fullName = firstName + ' ' + lastName;

  const result = await prisma.profile.create({
    data: profileData,
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: role,
    },
  });

  return result;
};

const getSingleProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      Profile: true,
      Booking: true,
      Bookmark: true,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  return findUser;
};

const updateProfile = async (
  user: JwtPayload,
  payload: Partial<Profile>
): Promise<Profile | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      Profile: true,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const result = await prisma.profile.update({
    where: {
      id: findUser.Profile[0].id,
    },
    data: payload,
  });

  return result;
};

export const ProfileService = {
  createProfile,
  getSingleProfile,
  updateProfile,
};
