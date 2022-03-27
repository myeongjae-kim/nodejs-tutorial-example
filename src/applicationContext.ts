import { createStore } from "@reduxjs/toolkit";
import readline from "readline";
import { ArticleInMemoryRepository } from "./article/adapter/outgoing/persistence/ArticleInMemoryRepository";
import { ArticlePersistenceAdapter } from "./article/adapter/outgoing/persistence/ArticlePersistenceAdapter";
import { ArticleCommandService } from "./article/application/ArticleCommandService";
import { ArticleQueryService } from "./article/application/ArticleQueryService";
import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { ArticleImpl } from "./article/domain/ArticleImpl";
import { ArticlePrinter } from "./article/view/cli/ArticlePrinter";
import { MyStore } from "./article/view/cli/state-modules/redux/MyStore";
import * as reduxModule from "./article/view/cli/state-modules/redux/redux-module";
import { StateManager } from "./article/view/cli/state-modules/vanila/StateManager";
import { MobxRootState } from "./article/view/cli/state-modules/mobx/MobxRootState";
import { MenuPrinter } from "./article/view/cli/MenuPrinter";
import { CliInOut } from "./common/view/cli/CliInOut";
import { ArticleQueryViewController } from "./article/view/cli/ArticleQueryViewController";
import { ArticleCommandViewController } from "./article/view/cli/ArticleCommandViewController";

export interface ApplicationContext {
  articleGetUseCase: ArticleGetUseCase;
  articleListUseCase: ArticleListUseCase;
  articleCreateUseCase: ArticleCreateUseCase;

  stateManager: StateManager;
  store: MyStore;
  mobxRootState: MobxRootState;

  articleQueryViewController: ArticleQueryViewController;
  articleCommandViewController: ArticleCommandViewController;
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

  const menuPrinter = new MenuPrinter(new ArticlePrinter());

  const cliInOut = new CliInOut(
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  );

  const articleQueryViewController = new ArticleQueryViewController(
    cliInOut,
    menuPrinter,
    articleQueryService,
    articleQueryService
  );

  const articleCommandViewController = new ArticleCommandViewController(
    cliInOut,
    menuPrinter,
    articleCommandService
  );

  return {
    articleGetUseCase: articleQueryService,
    articleListUseCase: articleQueryService,
    articleCreateUseCase: articleCommandService,

    stateManager: new StateManager(),
    store: createStore(reduxModule.reducer),
    mobxRootState: new MobxRootState(),

    articleQueryViewController,
    articleCommandViewController,
  };
};
