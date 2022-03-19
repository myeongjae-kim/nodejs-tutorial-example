import { ArticleResponse } from "./ArticleResponse";

// find와 get의 차이: 없을 때 예외가 발생하지 않으면 find, 예외가 발생하면 get
export interface ArticleGetUseCase {
  get(id: number): ArticleResponse;
}
