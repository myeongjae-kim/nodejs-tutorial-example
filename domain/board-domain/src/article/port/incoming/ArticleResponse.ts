import { Article } from "../../model/Article";

export type ArticleResponse = {
  id: number;
  title: string;
  content: string;
};

export const from = (article: Article): ArticleResponse => ({
  id: article.id,
  title: article.title,
  content: article.content,
});
