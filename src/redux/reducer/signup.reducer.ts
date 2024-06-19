import { SignUpDTO } from '../../dto';
import { HttpData } from '../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpModel, Status } from '../../models';
import { AppThunk } from '../store';
import { singUpAPI } from '../api/user.api';
import { userData } from '../../configs';
export interface ApiState {
  status: Status;
  message: string;
}
export const initState: ApiState = {
  status: Status.idle,
  message: '',
};
export interface ApiModel {
  error: boolean | string | undefined;
  message: string;
}
export interface LoginState extends ApiState {
  signUpData: SignUpModel | undefined;
}
export const initialState: LoginState = {
  ...initState,
  signUpData: undefined,
};
export const signUpSilce = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    singUp: (state: LoginState, action: PayloadAction<LoginState>) => {
      state.message = action.payload.message;
      state.signUpData = action.payload.signUpData;
      state.status = action.payload.status;
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    resetLogin: (state: LoginState) => {
      state.message = '';
      state.status = Status.idle;
      state.signUpData = undefined;
      userData.accessToken = '';
      userData.refreshToken = '';
      userData.expiredTime = ''
    },
  },
});

export const signUpAction =
  ({ ...input }: SignUpDTO): AppThunk => async dispatch => {
    dispatch(signUpSilce.actions.status(Status.loading));
    const result: HttpData<SignUpModel> = await singUpAPI(input);
    if (result.error) {
      dispatch(
        signUpSilce.actions.singUp({
          signUpData: undefined,
          message: result.message,
          status: Status.error,
        }),
      );
    } else {
      if (result.data) {
        userData.accessToken = result.data?.accessToken;

      }
      dispatch(
        signUpSilce.actions.singUp({
          signUpData: result?.data,
          message: result.message,
          status: Status.success,
        }),
      );
    }
  };
export const { singUp } = signUpSilce.actions;

export default signUpSilce.reducer;
