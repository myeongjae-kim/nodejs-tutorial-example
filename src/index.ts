import { Container, decorate, inject, injectable } from "inversify";
import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { createApplicationContext } from "./applicationContext";
import { Constants } from "./Constants";
import "reflect-metadata";

const context = createApplicationContext();

/*
const applicationByStateManager = new ApplicationByStateManager(
  context.stateManager,
  context.articleQueryViewController,
  context.articleCommandViewController
);
*/

const decorateClasses = () => {
  decorate(injectable(), ApplicationByStateManager);
  decorate(
    inject(Constants.SERVICE_IDS.StateManager),
    ApplicationByStateManager,
    0
  );
  decorate(
    inject(Constants.SERVICE_IDS.ArticleQueryViewController),
    ApplicationByStateManager,
    1
  );
  decorate(
    inject(Constants.SERVICE_IDS.ArticleCommandViewController),
    ApplicationByStateManager,
    2
  );
};

const bind = (container: Container) => {
  container
    .bind(Constants.SERVICE_IDS.StateManager)
    .toConstantValue(context.stateManager);
  container
    .bind(Constants.SERVICE_IDS.ArticleQueryViewController)
    .toConstantValue(context.articleQueryViewController);
  container
    .bind(Constants.SERVICE_IDS.ArticleCommandViewController)
    .toConstantValue(context.articleCommandViewController);
  container
    .bind(Constants.SERVICE_IDS.ApplicationByStateManager)
    .to(ApplicationByStateManager);
};

// initialize classes with decorators
decorateClasses();

// create IoC Container and bind Constants.SERVICE_IDS to instances or classes
const container = new Container();
bind(container);

// get the application
const applicationByStateManager = container.get<ApplicationByStateManager>(
  Constants.SERVICE_IDS.ApplicationByStateManager
);

applicationByStateManager.run();
