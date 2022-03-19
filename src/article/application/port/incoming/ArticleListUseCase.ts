import { ArticleResponse } from "./ArticleResponse";

export interface ArticleListUseCase {
  findAll(): ArticleResponse[];
}
