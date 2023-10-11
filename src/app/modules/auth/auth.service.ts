import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';

const createUser = async (userData: User): Promise<IUser> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');
  }

  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bycrypt_salt_rounds)
  );

  const createdUser = await prisma.user.create({
    data: userData,
  });

  // eslint-disable-next-line no-unused-vars
  const { password, ...result } = createdUser;

  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role } = isUserExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
