import { Article } from "../../../domain/Article";
import { ArticleImpl } from "../../../domain/ArticleImpl";

export type ArticleRequestDto = Omit<Article, "id">;

export const toEntity = (id: number, dto: ArticleRequestDto): ArticleImpl =>
  new ArticleImpl({ id, ...dto });
