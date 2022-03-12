import { ArticleResponseDto } from "../../article/application/port/incoming/ArticleResponseDto";
import { ArticlePrinter } from "../../article/view/cli/ArticlePrinter";
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

  public printHome = (): string =>
    `1) 목록 조회
2) 쓰기
x) 종료${this.printSelect()}`;

  public printArticleList = (articles: ArticleResponseDto[]): string =>
    ArticlePrinter.instance.printForList(...articles) +
    Constants.LINE_BREAK +
    this.printGoBack() +
    this.printSelect();

  public printArticleDetail = (article: ArticleResponseDto): string =>
    ArticlePrinter.instance.printEach(article) + this.printEnterKeyToGoBack();

  public printArticleSaved = (id: number): string =>
    Constants.LINE_BREAK +
    "게시글을 저장했습니다. id: " +
    id +
    this.printEnterKeyToGoBack();

  // 아래는 private도 가능할 것 같은데?
  public printGoBack = (): string => Constants.GO_BACK_COMMAND + ") 뒤로가기";
  public printSelect = (): string =>
    Constants.LINE_BREAK + Constants.LINE_BREAK + "선택: ";
  public printEnterKeyToGoBack = (): string =>
    Constants.LINE_BREAK +
    Constants.LINE_BREAK +
    "엔터 키를 누르면 이전 화면으로 되돌아갑니다.";
  public printWrongInput = (): string =>
    "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 숫자를 입력해주세요." +
    Constants.LINE_BREAK +
    Constants.LINE_BREAK;
}
