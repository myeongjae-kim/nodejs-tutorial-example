import { Constants } from "../../../Constants";
import { ArticleResponseDto } from "../../application/port/incoming/ArticleResponseDto";

export class ArticlePrinter {
  public printForList = (...dto: ArticleResponseDto[]): string =>
    dto.map((it) => `${it.id}) ${it.title}`).join(Constants.LINE_BREAK);

  public printEach = (dto: ArticleResponseDto): string =>
    `제목: ${dto.title}${Constants.LINE_BREAK}내용: ${dto.content}`;

  public printSaved = (id: number): string =>
    `게시글을 저장했습니다. id: ${id}`;
}
