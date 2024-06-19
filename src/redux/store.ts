import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducer/user.reducer';
import signUpReducer from './reducer/signup.reducer';
import categoryReducer from './reducer/category.reducer';
export const store = configureStore({
  reducer: {
    userReducer,
    signUpReducer,
    categoryReducer
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
