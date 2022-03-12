import { ArticleImpl } from "../../../domain/ArticleImpl";

export interface ArticleSavePort {
  // 저장을 요청하는 측에서 이미 id를 알고 있으므로 아무것도 return하지 않는다.
  // 저장하면서 id를 할당하는 경우에는 id를 리턴해야 함.
  save(article: ArticleImpl): void;
}
