export type IProfile = {
  id: string;
  userId: string;
  gender: string;
  role: string;
  fullName: string;
  contactNo: string;
  presentAddress: string;
  avatar: string;
  institutionName?: string;
  class?: string;
  designation?: string;
  degreee?: string;
  experienceYear?: string;
  SubjectOfExpertise?: string[];
  occupation?: string;
};
