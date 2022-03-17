import { Constants } from "../../../Constants";
import { ArticleResponseDto } from "../../application/port/incoming/ArticleResponseDto";
import { ArticlePrinter } from "./ArticlePrinter";

export class MenuPrinter {
  public constructor(private articlePrinter: ArticlePrinter) {}

  public printHome = (): string =>
    `1) 목록 조회
2) 쓰기
x) 종료${this.printSelect()}`;

  public printArticleList = (articles: ArticleResponseDto[]): string =>
    this.articlePrinter.printForList(...articles) +
    (articles.length > 0 ? Constants.LINE_BREAK : "") +
    this.printGoBack() +
    this.printSelect();

  public printArticleDetail = (article: ArticleResponseDto): string =>
    this.articlePrinter.printEach(article) + this.printEnterKeyToGoBack();

  public printArticleSaved = (id: number): string =>
    Constants.LINE_BREAK +
    this.articlePrinter.printSaved(id) +
    this.printEnterKeyToGoBack();

  public printWrongInput = (): string =>
    "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 문자를 입력해주세요." +
    Constants.LINE_BREAK +
    Constants.LINE_BREAK;

  private printGoBack = (): string => Constants.GO_BACK_COMMAND + ") 뒤로가기";
  private printSelect = (): string =>
    Constants.LINE_BREAK + Constants.LINE_BREAK + "선택: ";
  private printEnterKeyToGoBack = (): string =>
    Constants.LINE_BREAK +
    Constants.LINE_BREAK +
    "엔터 키를 누르면 이전 화면으로 되돌아갑니다.";
}
