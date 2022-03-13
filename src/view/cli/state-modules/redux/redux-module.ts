import { createAction, createReducer } from "@reduxjs/toolkit";
import { View } from "../View";

// ducks 구조를 사용한다.
const actions = {
  // fromHomeView: createAction<{input: string}>("@view/HOME"),
  // fromArticleListView: createAction<{input: string}>("@view/ARTICLE_LIST"),
  // fromArticleDetailView: createAction<{input: string}>("@view/ARTICLE_DETAIL"),
  // fromArticleFormView: createAction<{input: string}>("@view/ARTICLE_FORM"),
  setView: createAction<{ view: View }>("@view/SET_VIEW"),
  setInput: createAction<{ input: string }>("@view/SET_INPUT"),
};

// 외부로 export할 action creator만 선언. 현재는 모두 export한다.
export const { setView, setInput } = actions;

export type State = {
  view: View;
  input: string;
};

const createInitialState = (): State => ({ view: "HOME", input: "" });

export const reducer = createReducer(createInitialState(), (builder) => {
  builder
    .addCase(actions.setInput, (state, action) => {
      state.input = action.payload.input;
    })
    .addCase(actions.setView, (state, action) => {
      state.view = action.payload.view;
      state.input = "";
    });
});
