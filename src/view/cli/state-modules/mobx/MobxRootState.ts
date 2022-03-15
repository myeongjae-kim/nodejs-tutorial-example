import { makeAutoObservable } from "mobx";
import { View } from "../View";

interface State {
  view: View;
  input: string;
}

export class MobxRootState implements State {
  private _view: View;
  private _input: string;

  constructor(initialState: State = { view: "HOME", input: "" }) {
    this._view = initialState.view;
    this._input = initialState.input;
    makeAutoObservable(this);
  }

  public get view(): View {
    return this._view;
  }

  public get input(): string {
    return this._input;
  }

  public setView(view: View) {
    this._view = view;
    this._input = "";
  }

  public setInput(input: string) {
    this._input = input;
  }
}
