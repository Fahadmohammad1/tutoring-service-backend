import {
  GuardianProfile,
  StudentProfile,
  TeacherProfile,
} from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUser } from '../auth/auth.interface';
import {
  IGuardianProfile,
  IStudentProfile,
  ITeacherProfile,
} from './profile.interface';

const createStudentProfile = async (
  studentData: StudentProfile,
  userId: string
): Promise<IStudentProfile | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      StudentProfile: true,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const { firstName, middleName, lastName } = findUser;

  // setting user fullname for profile
  studentData.fullName = firstName + ' ' + middleName + ' ' + lastName;

  const result = await prisma.studentProfile.create({
    data: studentData,
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: 'student',
    },
  });

  return result;
};

const createGuardianProfile = async (
  guardianData: GuardianProfile,
  userId: string
): Promise<IGuardianProfile | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      StudentProfile: true,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const { firstName, middleName, lastName } = findUser;

  // setting user fullname for profile
  guardianData.fullName = firstName + ' ' + middleName + ' ' + lastName;

  const result = prisma.guardianProfile.create({
    data: guardianData,
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: 'parent',
    },
  });

  return result;
};

const createTeacherProfile = async (
  teacherData: TeacherProfile,
  userId: string
): Promise<ITeacherProfile | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      StudentProfile: true,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const { firstName, middleName, lastName } = findUser;

  // setting user fullname for profile
  teacherData.fullName = firstName + ' ' + middleName + ' ' + lastName;

  const result = prisma.teacherProfile.create({
    data: teacherData,
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: 'teacher',
    },
  });

  return result;
};

const getSingleProfile = async (user: JwtPayload): Promise<IUser | null> => {
  let result = null;

  if (user.role === 'student') {
    result = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      include: {
        StudentProfile: true,
      },
    });
  }

  if (user.role === 'parent') {
    result = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      include: {
        GuardianProfile: true,
      },
    });
  }

  if (user.role === 'teacher') {
    result = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      include: {
        TeacherProfile: true,
      },
    });
  }
  return result;
};

const updateProfile = async (
  user: JwtPayload,
  payload: Partial<StudentProfile | TeacherProfile>
): Promise<IStudentProfile | ITeacherProfile | null> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      StudentProfile: true,
      GuardianProfile: true,
      TeacherProfile: true,
    },
  });

  let result = null;

  if (findUser?.role === 'student') {
    result = await prisma.studentProfile.update({
      where: {
        id: findUser?.StudentProfile[0].id,
      },
      data: payload,
    });
  }

  if (findUser?.role === 'parent') {
    result = await prisma.guardianProfile.update({
      where: {
        id: findUser?.GuardianProfile[0].id,
      },
      data: payload,
    });
  }

  if (user.role === 'teacher') {
    result = await prisma.teacherProfile.update({
      where: {
        id: findUser?.TeacherProfile[0].id,
      },
      data: payload,
    });
  }

  return result;
};

export const ProfileService = {
  createStudentProfile,
  createGuardianProfile,
  createTeacherProfile,
  getSingleProfile,
  updateProfile,
};
