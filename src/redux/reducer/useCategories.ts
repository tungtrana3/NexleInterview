import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categorySilce } from "./category.reducer";
import { useAppSelector } from "../../hooks";

type SurveyAnswersHookResult = {
  categoriesIdsList: string[];
  updateCategory: ({ id, selected }: { id: string; selected: boolean }) => void;
};

export const useCategories = (): SurveyAnswersHookResult => {
  const categoriesIdsList = useAppSelector(state => state.categoryReducer.dataIdsList);
  const dispatch = useDispatch();

  const updateCategory = useCallback((params: { id: string; selected: boolean }) => {
    dispatch(categorySilce.actions.updateCategory(params));
  }, [dispatch]);

  return { categoriesIdsList, updateCategory };
};
