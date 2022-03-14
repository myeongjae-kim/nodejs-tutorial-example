import { CliController } from "./view/cli/CliController";
import { StateManager } from "./view/cli/state-modules/vanila/StateManager";

export class ApplicationByStateManager {
  constructor(
    private readonly stateManager: StateManager,
    private readonly cliController: CliController
  ) {}

  public run = async () => {
    for (;;) {
      switch (this.stateManager.getState().view) {
        case "HOME":
          await this.cliController
            .renderHome()
            .then((input) => this.stateManager.home(input));
          break;
        case "ARTICLE_LIST":
          await this.cliController
            .renderArticleList()
            .then((input) => this.stateManager.articleList(input));
          break;
        case "ARTICLE_DETAIL":
          await this.cliController
            .renderArticleDetail(this.stateManager.getState().selectedArticleId)
            .then(this.stateManager.articleDetail);
          break;
        case "ARTICLE_FORM":
          await this.cliController
            .rednerArticleForm()
            .then(this.stateManager.articleCreate);
          break;
        case "EXIT":
          process.exit(0);
      }
    }
  };
}
