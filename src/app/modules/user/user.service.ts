import prisma from '../../../shared/prisma';

const getAllProfiles = async (role: string) => {
  let profile = null;

  if (role === 'student') {
    profile = { StudentProfile: true };
  }
  if (role === 'guardian') {
    profile = { GuardianProfile: true };
  }
  if (role === 'teacher') {
    profile = { TeacherProfile: true };
  }

  return await prisma.user.findMany({
    where: {
      role: role ? role : {},
    },
    include: role
      ? profile
      : {
          StudentProfile: true,
          GuardianProfile: true,
          TeacherProfile: true,
        },
  });
};

export const UserService = {
  getAllProfiles,
};
