import prisma from '../../../shared/prisma';

const getAllProfiles = async (role: string) => {
  return await prisma.user.findMany({
    where: {
      role: role ? role : {},
    },
    include: {
      Profile: true,
    },
  });
};

export const UserService = {
  getAllProfiles,
};
