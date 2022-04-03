import { Constants } from "../../../Constants";
import { ArticleGetUseCase } from "board-domain/dist/article/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "board-domain/dist/article/port/incoming/ArticleListUseCase";
import { CliInOut } from "../../../common/view/cli/CliInOut";
import { MenuPrinter } from "./MenuPrinter";

export class ArticleQueryViewController {
  constructor(
    private readonly cliInOut: CliInOut,
    private readonly menuPrinter: MenuPrinter,
    private readonly articleListUseCase: ArticleListUseCase,
    private readonly articleGetUseCase: ArticleGetUseCase
  ) {}

  public renderHome = async (): Promise<string> => {
    const answer = await this.cliInOut.printAndGet(
      this.menuPrinter.printHome()
    );
    const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);

    if (!possibleAnswers.has(answer)) {
      this.cliInOut.print(this.menuPrinter.printWrongInput());
    }

    return answer;
  };

  public renderArticleList = async (): Promise<string> => {
    const articles = this.articleListUseCase.findAll();
    const answer = await this.cliInOut.printAndGet(
      this.menuPrinter.printArticleList(articles)
    );

    const possibleAnswers = new Set<string>(
      articles.map((it) => it.id + "") + Constants.GO_BACK_COMMAND
    );

    if (possibleAnswers.has(answer)) {
      return answer;
    }

    this.cliInOut.print(this.menuPrinter.printWrongInput());
    return "";
  };

  public renderArticleDetail = async (
    selectedArticleId: number
  ): Promise<void> => {
    const article = this.articleGetUseCase.get(selectedArticleId);
    await this.cliInOut.printAndGet(
      this.menuPrinter.printArticleDetail(article)
    );
  };
}
