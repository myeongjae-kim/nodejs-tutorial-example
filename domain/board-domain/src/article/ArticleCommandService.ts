import { ArticleCreateUseCase } from "./port/incoming/ArticleCreateUseCase";
import { ArticleRequest, toEntity } from "./port/incoming/ArticleRequest";
import { ArticleSavePort } from "./port/outgoing/ArticleSavePort";

export class ArticleCommandService implements ArticleCreateUseCase {
  constructor(private articleSavePort: ArticleSavePort) {}

  // 아래의 id 생성기를 generator 문법을 사용해서 구현할 수도 있다.
  private getNextId: () => number = ((initialId: number) => {
    let nextId = initialId;
    return () => nextId++;
  })(1);

  public create = (request: ArticleRequest): { id: number } => {
    const id = this.getNextId();
    this.articleSavePort.save(toEntity(id, request));

    return { id };
  };
}
