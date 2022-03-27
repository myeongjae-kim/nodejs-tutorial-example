import { Container, decorate, inject, injectable } from "inversify";
import { ApplicationByStateManager } from "../../ApplicationByStateManager";
import { ArticleStateManagerConfig } from "../../article/adapter/ArticleStateManagerConfig";
import { ArticleUiConfig } from "../../article/adapter/ArticleUiConfig";
import { DiConfig } from "./DiConfig";

export class ApplicationConfig implements DiConfig {
  public static SERVICE_ID = {
    ApplicationByStateManager: "ApplicationByStateManager",
  };

  public decorateClass(): void {
    decorate(injectable(), ApplicationByStateManager);
    decorate(
      inject(ArticleStateManagerConfig.SERVICE_ID.StateManager),
      ApplicationByStateManager,
      0
    );
    decorate(
      inject(ArticleUiConfig.SERVICE_ID.ArticleQueryViewController),
      ApplicationByStateManager,
      1
    );
    decorate(
      inject(ArticleUiConfig.SERVICE_ID.ArticleCommandViewController),
      ApplicationByStateManager,
      2
    );
  }
  public bind(c: Container): void {
    c.bind<ApplicationByStateManager>(
      ApplicationConfig.SERVICE_ID.ApplicationByStateManager
    ).to(ApplicationByStateManager);
  }
}
