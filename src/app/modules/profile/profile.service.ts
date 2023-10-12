import { StudentProfile, TeacherProfile } from '@prisma/client';
import prisma from '../../../shared/prisma';
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

export const ProfileService = {
  createStudentProfile,
  createTeacherProfile,
};
