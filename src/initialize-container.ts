import { Container } from "inversify";
import "reflect-metadata";
import { ArticleIncomingConfig } from "./article/adapter/ArticleIncomingConfig";
import { ArticleOutgoingConfig } from "./article/adapter/ArticleOutgoingConfig";
import { ArticleStateManagerConfig } from "./article/adapter/ArticleStateManagerConfig";
import { ArticleUiConfig } from "./article/adapter/ArticleUiConfig";
import { ApplicationConfig } from "./common/adapter/ApplicationConfig";
import { CliConfig } from "./common/adapter/CliConfig";
import { DiConfig } from "./common/adapter/DiConfig";

let decorated = false;

export const initializeContainer = (): Container => {
  const diConfigs: DiConfig[] = [
    new ArticleIncomingConfig(),
    new ArticleOutgoingConfig(),
    new ArticleStateManagerConfig(),
    new ArticleUiConfig(),
    new ApplicationConfig(),
    new CliConfig(),
  ];

  // initialize classes with decorators only once
  if (!decorated) {
    diConfigs.forEach((it) => it.decorateClass());
    decorated = true;
  }

  // create IoC Container and bind service identifiers to classes or instances
  const container = new Container({
    defaultScope: "Singleton",
  });
  diConfigs.forEach((it) => it.bind(container));

  return container;
};
