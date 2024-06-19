import { HttpData } from '../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, CategoryModel } from '../../models';
import { AppThunk } from '../store';
import { getCategoryAPI } from '../api/category.api';
import { ApiState, initState } from './user.reducer';

export interface CategoryState extends ApiState {
  categoryData: Array<CategoryModel>;
}
export const initialState: CategoryState = {
  ...initState,
  categoryData: [],
};

export const categorySilce = createSlice({
  name: 'category',
  initialState,
  reducers: {
    data: (state: CategoryState, action: PayloadAction<CategoryState>) => {
      state.msg = action.payload.msg;
      state.categoryData = action.payload.categoryData;
      state.status = action.payload.status;
    },
    status: (state: CategoryState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    reset: (state: CategoryState) => {
      state.msg = '';
      state.status = Status.idle;
      state.categoryData = [];
    },
  },
});

export const getCategoryAction =
  (): AppThunk => async dispatch => {
    dispatch(categorySilce.actions.status(Status.loading));
    const result: HttpData<CategoryModel[]> = await getCategoryAPI();
    if (result.error) {
      dispatch(
        categorySilce.actions.data({
          categoryData: [],
          msg: result.msg,
          status: Status.error,
        }),
      );
    } else {
      dispatch(
        categorySilce.actions.data({
          categoryData: result.data ? result.data : [],
          msg: result.msg,
          status: Status.success,
        }),
      );
    }
  };
export const selectCategoryAction =
  (id: string | number): AppThunk => async dispatch => {
    // dispatch(
    //   categorySilce.actions.data({
    //     categoryData: result.data ? result.data : [],
    //     msg: result.msg,
    //     status: Status.success,
    //   }),
    // );
  };
export const resetCategoryAction =
  (): AppThunk => async dispatch => {
    dispatch(categorySilce.actions.reset());
  };

export const { data } = categorySilce.actions;

export default categorySilce.reducer;
