import {createNativeStackNavigator} from '@react-navigation/native-stack';

export enum MainRoutes {
  Category = 'Category',
  Login = 'Login',
  SignUp = 'SignUp'
}

export type MainStackParamList = {
  [MainRoutes.Category]: undefined;
  [MainRoutes.Login]: undefined;
  [MainRoutes.SignUp]: undefined;
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
