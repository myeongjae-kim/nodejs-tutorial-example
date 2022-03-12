import { ArticleResponseDto } from "./ArticleResponseDto";

export interface ArticleListUseCase {
  findAll(): [ArticleResponseDto];
}
