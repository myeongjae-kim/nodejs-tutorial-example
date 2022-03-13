import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { Constants } from "./Constants";
import { CliInOut } from "./view/cli/CliInOut";
import { MenuPrinter } from "./view/cli/MenuPrinter";
import { StateManager } from "./view/cli/state-modules/vanila/StateManager";

export class StateManagerApplication {
  constructor(
    private cliInOut: CliInOut,
    private stateManager: StateManager,
    private menuPrinter: MenuPrinter,
    private articleListUseCase: ArticleListUseCase,
    private articleGetUseCase: ArticleGetUseCase,
    private articleCreateUseCase: ArticleCreateUseCase
  ) {}

  public run = async () => {
    for (;;) {
      switch (this.stateManager.getState().view) {
        case "HOME":
          await this.home();
          break;
        case "ARTICLE_LIST":
          await this.articleList();
          break;
        case "ARTICLE_DETAIL":
          await this.articleDetail();
          break;
        case "ARTICLE_FORM":
          await this.articleForm();
          break;
        case "EXIT":
          process.exit(0);
      }
    }
  };

  private home = async () => {
    const answer = await this.cliInOut.printAndGet(
      this.menuPrinter.printHome()
    );
    const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);

    if (!possibleAnswers.has(answer)) {
      this.cliInOut.print(this.menuPrinter.printWrongInput());
    }

    this.stateManager.home(answer);
  };

  private articleList = async () => {
    const articles = this.articleListUseCase.findAll();
    const answer = await this.cliInOut.printAndGet(
      this.menuPrinter.printArticleList(articles)
    );

    const possibleAnswers = new Set<string>(
      articles.map((it) => it.id + "") + Constants.GO_BACK_COMMAND
    );

    if (!possibleAnswers.has(answer)) {
      this.cliInOut.print(this.menuPrinter.printWrongInput());
    }

    this.stateManager.articleList(answer);
  };

  private articleDetail = async () => {
    const article = this.articleGetUseCase.get(
      this.stateManager.getState().selectedArticleId
    );
    await this.cliInOut
      .printAndGet(this.menuPrinter.printArticleDetail(article))
      .then(this.stateManager.articleDetail);
  };

  private articleForm = async () => {
    const title = await this.cliInOut.printAndGet("제목: ", false);
    const content = await this.cliInOut.printAndGet("내용: ", false);

    const { id } = this.articleCreateUseCase.create({
      title,
      content,
    });

    await this.cliInOut
      .printAndGet(this.menuPrinter.printArticleSaved(id))
      .then(this.stateManager.articleCreate);
  };
}
