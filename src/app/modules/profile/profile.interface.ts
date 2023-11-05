import { educationalStatus } from '@prisma/client';

export type IProfile = {
  id: string;
  userId: string;
  gender: string;
  role: string;
  fullName: string;
  contactNo: string;
  presentAddress: string;
  avatar: string;
  institution: string;
  stanadard?: string;
  designation?: string;
  degree?: string;
  educationalStatus: educationalStatus;
  yearOfExperience?: string;
  topicOfExpertise?: string[];
};
