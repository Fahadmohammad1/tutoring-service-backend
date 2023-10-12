export type IStudentProfile = {
  id: string;
  userId: string;
  gender: string;
  contactNo: string;
  presentAddress: string;
  avatar: string;
  institutionName?: string;
  class?: string;
};

export type ITeacherProfile = {
  id: string;
  userId: string;
  gender: string;
  contactNo: string;
  presentAddress: string;
  avatar: string;
  institutionName?: string;
  designation?: string;
  experienceYear?: string;
  SubjectOfExpertise?: string[];
};
