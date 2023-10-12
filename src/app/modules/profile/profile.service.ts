import { ParentProfile, StudentProfile, TeacherProfile } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import { IUser } from '../auth/auth.interface';
import { IStudentProfile, ITeacherProfile } from './profile.interface';

const createStudentProfile = async (
  studentData: StudentProfile,
  userId: string
): Promise<IStudentProfile | null> => {
  const result = prisma.studentProfile.create({
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

const createParentProfile = async (
  parentData: ParentProfile,
  userId: string
): Promise<ParentProfile | null> => {
  const result = prisma.parentProfile.create({
    data: parentData,
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
        ParentProfile: true,
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
      ParentProfile: true,
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
    result = await prisma.parentProfile.update({
      where: {
        id: findUser?.ParentProfile[0].id,
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
  createParentProfile,
  createTeacherProfile,
  getSingleProfile,
  updateProfile,
};
