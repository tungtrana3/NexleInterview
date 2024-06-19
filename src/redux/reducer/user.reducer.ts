import { LoginDTO } from '../../dto';
import { HttpData } from '../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/';
import { LoginModel } from '../../models';
import { AppThunk } from '../store';
import { loginAPI } from '../api/user.api';
import { userData } from '../../configs';
export interface ApiState {
  status: Status;
  msg: string;
}
export const initState: ApiState = {
  status: Status.idle,
  msg: '',
};
export interface ApiModel {
  error: boolean | string | undefined;
  msg: string;
}
export interface LoginState extends ApiState {
  loginData: LoginModel | undefined;
}
export const initialState: LoginState = {
  ...initState,
  loginData: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: LoginState, action: PayloadAction<LoginState>) => {
      state.msg = action.payload.msg;
      state.loginData = action.payload.loginData;
      state.status = action.payload.status;
      userData.accessToken = action.payload.loginData?.accessToken ? action.payload.loginData?.accessToken : '';
      userData.refreshToken =  action.payload.loginData?.refreshToken ? action.payload.loginData?.refreshToken :'';
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    resetLogin: (state: LoginState) => {
      state.msg = '';
      state.status = Status.idle;
      state.loginData = undefined;
      userData.accessToken = '';
      userData.refreshToken = '';
    },
  },
});

export const loginAction =
  ({ ...payload }: LoginDTO): AppThunk => async dispatch => {
    dispatch(userSlice.actions.status(Status.loading));
    const result: HttpData<LoginModel> = await loginAPI(payload);
    if (result.error) {
      dispatch(
        userSlice.actions.login({
          loginData: undefined,
          msg: result.msg,
          status: Status.error,
        }),
      );
    } else {
      if (result.data) {
        userData.accessToken = result.data?.accessToken;
        userData.refreshToken = result.data?.refreshToken;
      }
      dispatch(
        userSlice.actions.login({
          loginData: result?.data,
          msg: result.msg,
          status: Status.success,
        }),
      );
    }
  };
export const logOutAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetLogin());
};
export const { login } = userSlice.actions;

export default userSlice.reducer;
