import { Container, decorate, injectable } from "inversify";
import { DiConfig } from "../../common/adapter/DiConfig";
import { StateManager } from "../view/cli/state-modules/vanila/StateManager";

export class ArticleStateManagerConfig implements DiConfig {
  public static SERVICE_ID = {
    StateManager: "StateManager",
  };

  public decorateClass(): void {
    decorate(injectable(), StateManager);
  }
  public bind(c: Container): void {
    c.bind(ArticleStateManagerConfig.SERVICE_ID.StateManager).to(StateManager);
  }
}
