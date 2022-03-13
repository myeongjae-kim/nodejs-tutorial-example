import { View } from "./View";

export interface State {
  view: View;
  selectedArticleId: number;
}

export const createInitialState = (): State => ({
  view: "HOME",
  selectedArticleId: -1,
});
