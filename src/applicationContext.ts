import { ArticleInMemoryRepository } from "./article/adapter/outgoing/persistence/ArticleInMemoryRepository";
import { ArticlePersistenceAdapter } from "./article/adapter/outgoing/persistence/ArticlePersistenceAdapter";
import { ArticleCommandService } from "./article/application/ArticleCommandService";
import { ArticleQueryService } from "./article/application/ArticleQueryService";
import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { ArticleImpl } from "./article/domain/ArticleImpl";

export interface ApplicationContext {
  articleGetUseCase: ArticleGetUseCase;
  articleListUseCase: ArticleListUseCase;
  articleCreateUseCase: ArticleCreateUseCase;
}

export const createApplicationContext = (
  initialArticles: Record<number, ArticleImpl> = {}
): ApplicationContext => {
  const articleInMemoryRepository = new ArticleInMemoryRepository(
    initialArticles
  );

  const articlePersistenceAdapter = new ArticlePersistenceAdapter(
    articleInMemoryRepository
  );

  const articleQueryService = new ArticleQueryService(
    articlePersistenceAdapter
  );
  const articleCommandService = new ArticleCommandService(
    articlePersistenceAdapter
  );

  return {
    articleGetUseCase: articleQueryService,
    articleListUseCase: articleQueryService,
    articleCreateUseCase: articleCommandService,
  };
};
