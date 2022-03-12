import { Constants } from "../../../constants";
import { ArticleResponseDto } from "../../application/port/incoming/ArticleResponseDto";

export class ArticlePrinter {
  private static _instance: ArticlePrinter;

  public static get instance(): ArticlePrinter {
    if (!this._instance) {
      this._instance = new ArticlePrinter();
    }

    return this._instance;
  }

  private constructor() {
    // singleton pattern을 위한 private constructor
  }

  public printForList = (...dto: ArticleResponseDto[]): string =>
    dto.map((it) => `${it.id}) ${it.title}`).join(Constants.LINE_BREAK);

  public printEach = (dto: ArticleResponseDto): string =>
    `제목: ${dto.title}${Constants.LINE_BREAK}내용: ${dto.content}`;
}
