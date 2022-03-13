import { createInitialState, State } from "./types/State";

let state = createInitialState();

export const getState = (): State => ({ ...state });
export const setState = (newState: Partial<State>) => {
  state = {
    ...state,
    ...newState,
  };
};
