import { ArticleLoadPort } from "../../../application/port/outgoing/ArticleLoadPort";
import { ArticleSavePort } from "../../../application/port/outgoing/ArticleSavePort";
import { ArticleImpl } from "../../../domain/ArticleImpl";
import { ArticleInMemoryRepository } from "./ArticleInMemoryRepository";

export class ArticlePersistenceAdapter
  implements ArticleLoadPort, ArticleSavePort
{
  constructor(private repository: ArticleInMemoryRepository) {}

  public save = (article: ArticleImpl): void => {
    this.repository.save(article);
  };

  public findAll = (): ArticleImpl[] => this.repository.findAll();

  public findById = (id: number): ArticleImpl | undefined =>
    this.repository.findById(id);
}
