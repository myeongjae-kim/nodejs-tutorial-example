import os from "os";
export class Constants {
  private constructor() {
    // static 값용 클래스
  }

  public static LINE_BREAK = os.EOL;
  public static GO_BACK_COMMAND = "x";
}
