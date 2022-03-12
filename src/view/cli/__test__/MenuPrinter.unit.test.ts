import { MenuPrinter } from "../MenuPrinter";

describe("MenuPrinterTest", () => {
  test("printStrings", () => {
    expect(MenuPrinter.instance.printGoBack()).toBe("x) 뒤로가기");
    expect(MenuPrinter.instance.printSelect()).toBe("선택: ");
    expect(MenuPrinter.instance.printPressAnyKeyToGoBack()).toBe(
      "아무 키나 누르면 이전 화면으로 되돌아갑니다."
    );
    expect(MenuPrinter.instance.printWrongInput()).toBe(
      "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 숫자를 입력해주세요."
    );
  });
});
