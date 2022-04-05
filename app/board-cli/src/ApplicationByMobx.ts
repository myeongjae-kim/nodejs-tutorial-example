import { reaction } from "mobx";
import { ArticleCommandViewController } from "./article/view/cli/ArticleCommandViewController";
import { ArticleQueryViewController } from "./article/view/cli/ArticleQueryViewController";
import { MobxRootState } from "./article/view/cli/state-modules/mobx/MobxRootState";

export class ApplicationByMobx {
  constructor(
    private readonly mobxRootState: MobxRootState,
    private readonly articleQueryViewController: ArticleQueryViewController,
    private readonly articleCommandViewController: ArticleCommandViewController
  ) {
    reaction(
      () => mobxRootState.actionCounter,
      () => {
        switch (mobxRootState.view) {
          case "HOME":
            this.homeListener();
            break;
          case "ARTICLE_LIST":
            this.articleListListener();
            break;
          case "ARTICLE_FORM":
            this.articleFormListener();
            break;
          case "EXIT":
            this.exitListener();
        }
      }
    );
  }

  public run = (): void => {
    this.homeListener();
  };

  private homeListener = () => {
    switch (this.mobxRootState.input) {
      case "":
        void this.articleQueryViewController
          .renderHome()
          .then((answer) => this.mobxRootState.setInput(answer));
        break;
      case "1":
        this.mobxRootState.setView("ARTICLE_LIST");
        break;
      case "2":
        this.mobxRootState.setView("ARTICLE_FORM");
        break;
      case "x":
        this.mobxRootState.setView("EXIT");
        break;
      default:
        this.mobxRootState.setView("HOME");
    }
  };

  private articleListListener = () => {
    const { input } = this.mobxRootState;

    switch (input) {
      case "":
        void this.articleQueryViewController
          .renderArticleList()
          .then((answer) => this.mobxRootState.setInput(answer));
        break;
      case "x":
        this.mobxRootState.setView("HOME");
        break;
      default:
        void this.articleQueryViewController
          .renderArticleDetail(parseInt(input))
          .then(() => this.mobxRootState.setView("ARTICLE_LIST"));
        break;
    }
  };

  private articleFormListener = () => {
    void this.articleCommandViewController.rednerArticleForm().then(() => {
      this.mobxRootState.setView("HOME");
    });
  };

  private exitListener = () => {
    process.exit(0);
  };
}
