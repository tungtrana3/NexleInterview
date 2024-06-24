import { HttpData } from '../../helpers/api.helper';
import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, CategoryModel } from '../../models';
import { AppThunk, RootState } from '../store';
import { getCategoryAPI } from '../api/category.api';
import { ApiState, initState } from './user.reducer';
import { createSelector } from 'reselect'

export interface CategoriesState extends ApiState {
  dataIdsList: string[];
  dataById: Partial<Record<string, CategoryModel>>
};
export const initialState: CategoriesState = {
  ...initState,
  dataIdsList: [],
  dataById: {},
};
export const categorySilce = createSlice({
  name: 'category',
  initialState,
  reducers: {
    data: (state: CategoriesState, action: PayloadAction<CategoriesState>) => {
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.dataById = action.payload.dataById;
      state.dataIdsList = action.payload.dataIdsList;
    },
    status: (state: CategoriesState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    updateCategory: (
      state: CategoriesState,
      { payload: { id, selected } }: PayloadAction<{ id: string; selected: boolean }>
    ) => {
      const category = state.dataById[id];
      if (category) {
        category.selected = selected;
      }
    },
    reset: (state: CategoriesState) => {
      state.msg = '';
      state.dataById = {};
      state.dataIdsList = [];
      state.status = Status.idle;
    },
  },
});

export const getCategoryAction =
  (): AppThunk => async dispatch => {
    dispatch(categorySilce.actions.status(Status.loading));
    const result: HttpData<CategoryModel[]> = await getCategoryAPI();
    if (!result.error) {
      let categories = result.data
      let dataIdsList = categories ? categories.map(({ id }) => id) : []
      let dataById = categories ? categories.reduce(
        (acc, { name, id }) => ({
          ...acc,
          [id]: {
            id,
            name,
            selected: false,
          },
        }), {} as Partial<Record<number, CategoryModel>>
      ) : {}
      dispatch(
        categorySilce.actions.data({
          msg: result.msg,
          status: Status.error,
          dataIdsList,
          dataById,
        }),
      );
    } else {
      dispatch(
        categorySilce.actions.data({
          msg: result.msg,
          status: Status.success,
          dataIdsList: [],
          dataById: {}
        }),
      );
    }
  };

export const resetCategoryAction =
  (): AppThunk => async dispatch => {
    dispatch(categorySilce.actions.reset());
  };

// export const createTypedDraftSafeSelector =
//   createDraftSafeSelector.withTypes<RootState>()

// export const selectCategoriesIdsList = createTypedDraftSafeSelector(
//   (state) => state.categoryReducer.dataIdsList,
//   (data) => data,
// )
// export const selectCategory = createTypedDraftSafeSelector(
//   (state) => state.categoryReducer.dataById,
//   (data, id) => data[id],
// )
export const { data } = categorySilce.actions;

export default categorySilce.reducer;