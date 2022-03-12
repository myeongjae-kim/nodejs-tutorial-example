import { ArticleRequestDto } from "./ArticleRequestDto";

// CQS 지키기. 상태를 바꾸는 UseCase이므로 아무것도 return하지 않는게 제일 좋지만
// 생성의 경우에는 어쩔 수 없이 id를 내보내야 한다.
// CQRS: https://myeongjae.kim/blog/2022/02/03/fundamental-cqrs
export interface ArticleCreateUseCase {
  create(requestDto: ArticleRequestDto): { id: number };
}
