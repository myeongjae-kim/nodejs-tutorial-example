import { ArticleCommandViewController } from "./article/view/cli/ArticleCommandViewController";
import { ArticleQueryViewController } from "./article/view/cli/ArticleQueryViewController";
import { StateManager } from "./article/view/cli/state-modules/vanila/StateManager";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Constants } from "./Constants";

@injectable()
export class ApplicationByStateManager {
  constructor(
    @inject(Constants.SERVICE_IDS.StateManager)
    private readonly stateManager: StateManager,
    @inject(Constants.SERVICE_IDS.ArticleQueryViewController)
    private readonly cliQueryController: ArticleQueryViewController,
    @inject(Constants.SERVICE_IDS.ArticleCommandViewController)
    private readonly cliCommandController: ArticleCommandViewController
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
