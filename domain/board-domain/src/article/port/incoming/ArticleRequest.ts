import { Article } from "../../model/Article";
import { ArticleImpl } from "../../model/ArticleImpl";

export type ArticleRequest = Omit<Article, "id">;

export const toEntity = (id: number, request: ArticleRequest): ArticleImpl =>
  new ArticleImpl({ id, ...request });
