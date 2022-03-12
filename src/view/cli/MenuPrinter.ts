import { Constants } from "../../Constants";

export class MenuPrinter {
  private static _instance: MenuPrinter;

  public static get instance(): MenuPrinter {
    if (!this._instance) {
      this._instance = new MenuPrinter();
    }

    return this._instance;
  }

  private constructor() {
    // singleton pattern을 위한 private constructor
  }

  public printGoBack = (): string => Constants.GO_BACK_COMMAND + ") 뒤로가기";
  public printSelect = (): string => "선택: ";
  public printPressAnyKeyToGoBack = (): string =>
    "아무 키나 누르면 이전 화면으로 되돌아갑니다.";
  public printWrongInput = (): string =>
    "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 숫자를 입력해주세요.";
}
