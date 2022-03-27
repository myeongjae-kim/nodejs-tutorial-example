import { Container } from "inversify";
import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { createApplicationContext } from "./applicationContext";
import { Constants } from "./Constants";

const context = createApplicationContext();

/*
const applicationByStateManager = new ApplicationByStateManager(
  context.stateManager,
  context.articleQueryViewController,
  context.articleCommandViewController
);
*/

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

// create IoC Container and bind Constants.SERVICE_IDS to instances or classes
const container = new Container();
bind(container);

// get the application
const applicationByStateManager = container.get<ApplicationByStateManager>(
  Constants.SERVICE_IDS.ApplicationByStateManager
);

applicationByStateManager.run();
