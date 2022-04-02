import { ArticleCommandViewController } from "./article/view/cli/ArticleCommandViewController";
import { ArticleQueryViewController } from "./article/view/cli/ArticleQueryViewController";
import { MyStore } from "./article/view/cli/state-modules/redux/MyStore";
import * as reduxModule from "./article/view/cli/state-modules/redux/redux-module";
import { View } from "./article/view/cli/state-modules/View";

export class ApplicationByRedux {
  constructor(
    private readonly store: MyStore,
    private readonly articleQueryViewController: ArticleQueryViewController,
    private readonly articleCommandViewController: ArticleCommandViewController
  ) {
    const subscribe = (view: View, listener: () => void) => {
      store.subscribe(() => {
        if (view === this.store.getState().view) {
          listener();
        }
      });
    };

    subscribe("HOME", this.homeListener);
    subscribe("ARTICLE_LIST", this.articleListListener);
    subscribe("ARTICLE_FORM", this.articleFormListener);
    subscribe("EXIT", this.exitListener);
  }

  public run = (): void => {
    this.store.dispatch(reduxModule.setView({ view: "HOME" }));
  };

  private homeListener = () => {
    switch (this.store.getState().input) {
      case "":
        this.articleQueryViewController
          .renderHome()
          .then((answer) =>
            this.store.dispatch(reduxModule.setInput({ input: answer }))
          );
        break;
      case "1":
        this.store.dispatch(reduxModule.setView({ view: "ARTICLE_LIST" }));
        break;
      case "2":
        this.store.dispatch(reduxModule.setView({ view: "ARTICLE_FORM" }));
        break;
      case "x":
        this.store.dispatch(reduxModule.setView({ view: "EXIT" }));
        break;
      default:
        this.store.dispatch(reduxModule.setView({ view: "HOME" }));
    }
  };

  private articleListListener = () => {
    const { input } = this.store.getState();

    switch (input) {
      case "":
        this.articleQueryViewController
          .renderArticleList()
          .then((answer) =>
            this.store.dispatch(reduxModule.setInput({ input: answer }))
          );
        break;
      case "x":
        this.store.dispatch(reduxModule.setView({ view: "HOME" }));
        break;
      default:
        this.articleQueryViewController
          .renderArticleDetail(parseInt(input))
          .then(() => {
            this.store.dispatch(reduxModule.setView({ view: "ARTICLE_LIST" }));
          });
        break;
    }
  };

  private articleFormListener = () => {
    this.articleCommandViewController.rednerArticleForm().then(() => {
      this.store.dispatch(reduxModule.setView({ view: "HOME" }));
    });
  };

  private exitListener = () => {
    process.exit(0);
  };
}
