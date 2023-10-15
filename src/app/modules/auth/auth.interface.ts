export type IUser = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
