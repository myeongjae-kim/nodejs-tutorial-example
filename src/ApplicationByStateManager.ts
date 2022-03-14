import { CliCommandController } from "./view/cli/CliCommandController";
import { CliQueryController } from "./view/cli/CliQueryController";
import { StateManager } from "./view/cli/state-modules/vanila/StateManager";

export class ApplicationByStateManager {
  constructor(
    private readonly stateManager: StateManager,
    private readonly cliQueryController: CliQueryController,
    private readonly cliCommandController: CliCommandController
  ) {}

  public run = async () => {
    for (;;) {
      switch (this.stateManager.getState().view) {
        case "HOME":
          await this.cliQueryController
            .renderHome()
            .then((input) => this.stateManager.home(input));
          break;
        case "ARTICLE_LIST":
          await this.cliQueryController
            .renderArticleList()
            .then((input) => this.stateManager.articleList(input));
          break;
        case "ARTICLE_DETAIL":
          await this.cliQueryController
            .renderArticleDetail(this.stateManager.getState().selectedArticleId)
            .then(this.stateManager.articleDetail);
          break;
        case "ARTICLE_FORM":
          await this.cliCommandController
            .rednerArticleForm()
            .then(this.stateManager.articleCreate);
          break;
        case "EXIT":
          process.exit(0);
      }
    }
  };
}
