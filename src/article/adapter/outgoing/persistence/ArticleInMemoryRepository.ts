import { ArticleImpl } from "../../../domain/ArticleImpl";

export class ArticleInMemoryRepository {
  constructor(private records: Record<number, ArticleImpl> = {}) {}

  public save = (article: ArticleImpl): void => {
    this.records[article.id] = article;
  };

  public findById = (id: number): ArticleImpl | undefined => this.records[id];

  public findAll = (): ArticleImpl[] => Object.values(this.records);
}
