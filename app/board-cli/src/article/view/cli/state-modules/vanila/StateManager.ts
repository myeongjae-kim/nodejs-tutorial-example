import { Constants } from "../../../../../Constants";
import { createInitialState, State } from "../State";

export class StateManager {
  constructor(private state: State = createInitialState()) {}

  public home = (answer: string) => {
    switch (answer) {
      case "1":
        this.setState({ view: "ARTICLE_LIST" });
        break;
      case "2":
        this.setState({ view: "ARTICLE_FORM" });
        break;
      case "x":
        this.setState({ view: "EXIT" });
        break;
    }
  };

  public articleList = (answer: string) => {
    switch (answer) {
      case "":
        break;
      case Constants.GO_BACK_COMMAND:
        this.setState({ view: "HOME" });
        break;
      default:
        this.setState({
          view: "ARTICLE_DETAIL",
          selectedArticleId: parseInt(answer),
        });
        break;
    }
  };

  public articleDetail = () => {
    this.setState({ view: "ARTICLE_LIST", selectedArticleId: -1 });
  };

  public articleCreate = () => {
    this.setState({ view: "HOME", selectedArticleId: -1 });
  };

  public getState = (): State => ({ ...this.state });

  private setState = (newState: Partial<State>) => {
    this.state = {
      ...this.state,
      ...newState,
    };
  };
}
