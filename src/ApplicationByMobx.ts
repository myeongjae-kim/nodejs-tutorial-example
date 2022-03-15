import { reaction } from "mobx";
import { CliCommandController } from "./view/cli/CliCommandController";
import { CliQueryController } from "./view/cli/CliQueryController";
import { MobxRootState } from "./view/cli/state-modules/mobx/MobxRootState";

export class ApplicationByMobx {
  constructor(
    private readonly mobxRootState: MobxRootState,
    private readonly cliQueryController: CliQueryController,
    private readonly cliCommandController: CliCommandController
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
        this.cliQueryController
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
        this.cliQueryController
          .renderArticleList()
          .then((answer) => this.mobxRootState.setInput(answer));
        break;
      case "x":
        this.mobxRootState.setView("HOME");
        break;
      default:
        this.cliQueryController
          .renderArticleDetail(parseInt(input))
          .then(() => this.mobxRootState.setView("ARTICLE_LIST"));
        break;
    }
  };

  private articleFormListener = () => {
    this.cliCommandController.rednerArticleForm().then(() => {
      this.mobxRootState.setView("HOME");
    });
  };

  private exitListener = () => {
    process.exit(0);
  };
}
