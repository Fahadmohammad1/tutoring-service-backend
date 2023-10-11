import { StudentProfile } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IStudentProfile } from './profile.interface';

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

export const ProfileService = {
  createStudentProfile,
};
