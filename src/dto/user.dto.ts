import {Platform} from 'react-native';
export interface LoginDTO {
  email: string;
  password: string;
}
export interface ChangePwdDTO {
  oldPassword: string;
  newPassword: string;
}
export interface SignUpDTO {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}
export interface ConfigDTO {
  app: 'DELIVERY';
  version: string;
  build: string | number;
  platform: Platform['OS'];
}
