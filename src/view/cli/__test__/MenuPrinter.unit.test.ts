import { ArticlePrinter } from "../../../article/view/cli/ArticlePrinter";
import { MenuPrinter } from "../MenuPrinter";

describe("MenuPrinterTest", () => {
  test("printStrings", () => {
    const menuPrinter = new MenuPrinter(new ArticlePrinter());
    expect(menuPrinter.printGoBack()).toBe("x) 뒤로가기");
    expect(menuPrinter.printSelect()).toBe("\n\n선택: ");
    expect(menuPrinter.printEnterKeyToGoBack()).toBe(
      "아무 키나 누르면 이전 화면으로 되돌아갑니다."
    );
    expect(menuPrinter.printWrongInput()).toBe(
      "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 숫자를 입력해주세요."
    );
  });
});
