import { Article } from "../../../domain/Article";
import { ArticleImpl } from "../../../domain/ArticleImpl";

export type ArticleRequest = Omit<Article, "id">;

export const toEntity = (id: number, request: ArticleRequest): ArticleImpl =>
  new ArticleImpl({ id, ...request });
