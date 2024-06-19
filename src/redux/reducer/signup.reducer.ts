import { SignUpDTO } from '../../dto';
import { HttpData } from '../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpModel, Status } from '../../models';
import { AppThunk } from '../store';
import { singUpAPI } from '../api/user.api';
import { userData } from '../../configs';
import { ApiState, initState } from './user.reducer';

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
      state.msg = action.payload.msg;
      state.signUpData = action.payload.signUpData;
      state.status = action.payload.status;
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    reset: (state: LoginState) => {
      state.msg = '';
      state.status = Status.idle;
      state.signUpData = undefined;
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
          msg: result.msg,
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
          msg: result.msg,
          status: Status.success,
        }),
      );
    }
  };
export const resetSignUpAction =
  (): AppThunk => async dispatch => {
    dispatch(signUpSilce.actions.reset());
  };

export const { singUp } = signUpSilce.actions;

export default signUpSilce.reducer;
