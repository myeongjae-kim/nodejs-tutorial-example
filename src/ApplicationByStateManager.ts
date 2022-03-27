import { ArticleCommandViewController } from "./article/view/cli/ArticleCommandViewController";
import { ArticleQueryViewController } from "./article/view/cli/ArticleQueryViewController";
import { StateManager } from "./article/view/cli/state-modules/vanila/StateManager";

export class ApplicationByStateManager {
  constructor(
    private readonly stateManager: StateManager,
    private readonly articleQueryViewController: ArticleQueryViewController,
    private readonly articleCommandViewController: ArticleCommandViewController
  ) {}

  public run = async () => {
    for (;;) {
      switch (this.stateManager.getState().view) {
        case "HOME":
          await this.articleQueryViewController
            .renderHome()
            .then((input) => this.stateManager.home(input));
          break;
        case "ARTICLE_LIST":
          await this.articleQueryViewController
            .renderArticleList()
            .then((input) => this.stateManager.articleList(input));
          break;
        case "ARTICLE_DETAIL":
          await this.articleQueryViewController
            .renderArticleDetail(this.stateManager.getState().selectedArticleId)
            .then(this.stateManager.articleDetail);
          break;
        case "ARTICLE_FORM":
          await this.articleCommandViewController
            .rednerArticleForm()
            .then(this.stateManager.articleCreate);
          break;
        case "EXIT":
          process.exit(0);
      }
    }
  };
}
