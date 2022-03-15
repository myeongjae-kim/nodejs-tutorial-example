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
import { CliQueryController } from "./view/cli/CliQueryController";
import { CliInOut } from "./view/cli/CliInOut";
import { MenuPrinter } from "./view/cli/MenuPrinter";
import { MyStore } from "./view/cli/state-modules/redux/MyStore";
import * as reduxModule from "./view/cli/state-modules/redux/redux-module";
import { StateManager } from "./view/cli/state-modules/vanila/StateManager";
import { CliCommandController } from "./view/cli/CliCommandController";
import { MobxRootState } from "./view/cli/state-modules/mobx/MobxRootState";

export interface ApplicationContext {
  articleGetUseCase: ArticleGetUseCase;
  articleListUseCase: ArticleListUseCase;
  articleCreateUseCase: ArticleCreateUseCase;
  menuPrinter: MenuPrinter;
  stateManager: StateManager;
  store: MyStore;
  mobxRootState: MobxRootState;

  cliInOut: CliInOut;
  cliQueryController: CliQueryController;
  cliCommandController: CliCommandController;
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

  const cliQueryController = new CliQueryController(
    cliInOut,
    menuPrinter,
    articleQueryService,
    articleQueryService
  );

  const cliCommandController = new CliCommandController(
    cliInOut,
    menuPrinter,
    articleCommandService
  );

  return {
    articleGetUseCase: articleQueryService,
    articleListUseCase: articleQueryService,
    articleCreateUseCase: articleCommandService,

    menuPrinter,
    stateManager: new StateManager(),
    store: createStore(reduxModule.reducer),
    mobxRootState: new MobxRootState(),

    cliInOut,
    cliQueryController,
    cliCommandController,
  };
};
