import { makeAutoObservable } from "mobx";
import { View } from "../View";

interface State {
  view: View;
  input: string;
  actionCounter: number;
}

export class MobxRootState implements State {
  private _view: View;
  private _input: string;

  // mobx는 observable에 동일한 값이 할당되면 effect를 발생시키지 않는다.
  // _view와 _input에 모두 동일한 값이 할당되더라도 매번 effect를 발생시켜야 하므로
  // _actionCounter를 추가해서 모든 액션에 대해서 +1이 되도록 한다.
  // _actionCounter를 구독하는 effect는 _view와 _input의 값과 상관없이 계속 발생하게 된다.
  // 이 방식은 mobx답게 쓰는 방식이 아니지만.. 일단 이렇게 임시방편으로 처리. 작동은 잘 된다.
  private _actionCounter: number;

  constructor(
    initialState: State = { view: "HOME", input: "", actionCounter: 0 }
  ) {
    this._view = initialState.view;
    this._input = initialState.input;
    this._actionCounter = initialState.actionCounter;
    makeAutoObservable(this);
  }

  public get view(): View {
    return this._view;
  }

  public get input(): string {
    return this._input;
  }

  public get actionCounter(): number {
    return this._actionCounter;
  }

  public setView(view: View) {
    this._view = view;
    this._input = "";
    this._actionCounter++;
  }

  public setInput(input: string) {
    this._input = input;
    this._actionCounter++;
  }
}
