
export interface UserModel {
  email: string;
  status: string;
}

export interface LoginModel {
  accessToken: string;
  refreshToken: string;
  expiredTime: string;
  user: UserModel;
}
export interface SignUpModel {
  accessToken: string;
  user: UserModel;
  id: 2,
  createdAt: string,
  updatedAt: string,
  email: string,
  firstName: string,
  lastName: string,
  role: 'USER' | 'ADMIN'
}
export interface RefreshTokenModel {
  accessToken: string;
  refreshToken: string
}