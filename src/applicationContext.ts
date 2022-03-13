import readline from "readline";
import { ArticleInMemoryRepository } from "./article/adapter/outgoing/persistence/ArticleInMemoryRepository";
import { ArticlePersistenceAdapter } from "./article/adapter/outgoing/persistence/ArticlePersistenceAdapter";
import { ArticleCommandService } from "./article/application/ArticleCommandService";
import { ArticleQueryService } from "./article/application/ArticleQueryService";
import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { ArticleImpl } from "./article/domain/ArticleImpl";
import { StateManager } from "./view/cli/state-modules/vanila/StateManager";
import { CliInOut } from "./view/cli/CliInOut";
import { MenuPrinter } from "./view/cli/MenuPrinter";
import { ArticlePrinter } from "./article/view/cli/ArticlePrinter";

export interface ApplicationContext {
  articleGetUseCase: ArticleGetUseCase;
  articleListUseCase: ArticleListUseCase;
  articleCreateUseCase: ArticleCreateUseCase;
  menuPrinter: MenuPrinter;
  stateManager: StateManager;
  cliInOut: CliInOut;
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

    menuPrinter: new MenuPrinter(new ArticlePrinter()),
    stateManager: new StateManager(),

    cliInOut: new CliInOut(
      readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
    ),
  };
};
