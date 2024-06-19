import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducer/user.reducer';
import signUpReducer from './reducer/signup.reducer';

export const store = configureStore({
  reducer: {
    userReducer,
    signUpReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
