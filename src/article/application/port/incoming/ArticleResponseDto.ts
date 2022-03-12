import { Article } from "../../../domain/Article";

export type ArticleResponseDto = Article;

export const from = (article: Article): ArticleResponseDto => ({
  id: article.id,
  title: article.title,
  content: article.content,
});
