import { Article } from "../../../domain/Article";

export type ArticleResponseDto = {
  id: number;
  title: string;
  content: string;
};

export const from = (article: Article): ArticleResponseDto => ({
  id: article.id,
  title: article.title,
  content: article.content,
});
