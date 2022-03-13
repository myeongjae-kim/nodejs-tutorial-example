import { ActionFromReducer, Store } from "@reduxjs/toolkit";
import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { Constants } from "./Constants";
import { CliInOut } from "./view/cli/CliInOut";
import { MenuPrinter } from "./view/cli/MenuPrinter";
import * as reduxModule from "./view/cli/state-modules/redux/redux-module";

export class ApplicationByRedux {
  constructor(
    private readonly cliInOut: CliInOut,
    private readonly store: Store<
      reduxModule.State,
      ActionFromReducer<typeof reduxModule.reducer>
    >,
    private readonly menuPrinter: MenuPrinter,
    private readonly articleListUseCase: ArticleListUseCase,
    private readonly articleGetUseCase: ArticleGetUseCase,
    private readonly articleCreateUseCase: ArticleCreateUseCase
  ) {
    // listener 여러개 등록해서 switch case 없애자
    // renderer 분리해서 ApplicationByRedux랑 ApplicationByStateManager의 중복코드 없앨 수 있을듯
    store.subscribe(() => {
      const { view, input } = store.getState();

      switch (view) {
        case "HOME":
          {
            switch (input) {
              case "":
                this.renderHome();
                break;
              case "1":
                store.dispatch(reduxModule.setView({ view: "ARTICLE_LIST" }));
                break;
              case "2":
                store.dispatch(reduxModule.setView({ view: "ARTICLE_FORM" }));
                break;
              case "x":
                process.exit(0);
            }
          }
          break;
        case "ARTICLE_LIST":
          {
            switch (input) {
              case "":
                this.renderArticleList();
                break;
              case "x":
                store.dispatch(reduxModule.setView({ view: "HOME" }));
                break;
              default:
                this.renderArticleDetail(parseInt(input));
                break;
            }
          }
          break;
        case "ARTICLE_FORM":
          this.rednerArticleForm();
          break;
        case "EXIT":
          process.exit(0);
      }
    });
  }

  public run = async () => {
    await this.renderHome();
  };

  private renderHome = async () => {
    const answer = await this.cliInOut.printAndGet(
      this.menuPrinter.printHome()
    );
    const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);

    if (!possibleAnswers.has(answer)) {
      this.cliInOut.print(this.menuPrinter.printWrongInput());
    }

    this.store.dispatch(reduxModule.setInput({ input: answer }));
  };

  private renderArticleList = async () => {
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

    this.store.dispatch(reduxModule.setInput({ input: answer }));
  };

  private renderArticleDetail = async (selectedArticleId: number) => {
    const article = this.articleGetUseCase.get(selectedArticleId);
    await this.cliInOut.printAndGet(
      this.menuPrinter.printArticleDetail(article)
    );

    this.store.dispatch(reduxModule.setView({ view: "ARTICLE_LIST" }));
  };

  private rednerArticleForm = async () => {
    const title = await this.cliInOut.printAndGet("제목: ", false);
    const content = await this.cliInOut.printAndGet("내용: ", false);

    const { id } = this.articleCreateUseCase.create({
      title,
      content,
    });

    await this.cliInOut.printAndGet(this.menuPrinter.printArticleSaved(id));
    this.store.dispatch(reduxModule.setView({ view: "HOME" }));
  };
}
