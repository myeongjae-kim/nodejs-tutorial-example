import { Article } from "../domain/Article";
import { ArticleGetUseCase } from "./port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./port/incoming/ArticleListUseCase";
import { ArticleLoadPort } from "./port/outgoing/ArticleLoadPort";

export class ArticleQueryService
  implements ArticleGetUseCase, ArticleListUseCase
{
  constructor(private articleLoadPort: ArticleLoadPort) {}

  public get = (id: number): Article => {
    const article = this.articleLoadPort.findById(id);
    if (article === undefined) {
      throw new Error("error.article.not-found");
    }

    return article;
  };

  public findAll = (): Article[] => this.articleLoadPort.findAll();
}
