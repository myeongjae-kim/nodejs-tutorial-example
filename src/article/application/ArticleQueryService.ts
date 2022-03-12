import { ArticleGetUseCase } from "./port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./port/incoming/ArticleListUseCase";
import { ArticleResponseDto, from } from "./port/incoming/ArticleResponseDto";
import { ArticleLoadPort } from "./port/outgoing/ArticleLoadPort";

export class ArticleQueryService
  implements ArticleGetUseCase, ArticleListUseCase
{
  constructor(private articleLoadPort: ArticleLoadPort) {}

  public get = (id: number): ArticleResponseDto => {
    const article = this.articleLoadPort.findById(id);
    if (article === undefined) {
      throw new Error("error.article.not-found");
    }

    return from(article);
  };

  public findAll = (): ArticleResponseDto[] =>
    this.articleLoadPort.findAll().map(from);
}
