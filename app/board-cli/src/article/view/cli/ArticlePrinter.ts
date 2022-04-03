import { Constants } from "../../../Constants";
import { ArticleResponse } from "board-domain/dist/article/port/incoming/ArticleResponse";

export class ArticlePrinter {
  public printForList = (...response: ArticleResponse[]): string =>
    response.map((it) => `${it.id}) ${it.title}`).join(Constants.LINE_BREAK);

  public printEach = (response: ArticleResponse): string =>
    `제목: ${response.title}${Constants.LINE_BREAK}내용: ${response.content}`;

  public printSaved = (id: number): string =>
    `게시글을 저장했습니다. id: ${id}`;
}
