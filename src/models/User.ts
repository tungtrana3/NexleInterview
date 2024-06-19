
export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface LoginModel {
  accessToken: string;
  refreshToken: string;
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
  statusCode: number,
  message: string
}
export interface RefreshTokenModel {
  accessToken: string;
  refreshToken: string
}