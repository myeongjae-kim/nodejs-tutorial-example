import { ArticleCreateUseCase } from "../../article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "../../article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "../../article/application/port/incoming/ArticleListUseCase";
import { Constants } from "../../Constants";
import { CliInOut } from "./CliInOut";
import { MenuPrinter } from "./MenuPrinter";

export class CliController {
  constructor(
    private readonly cliInOut: CliInOut,
    private readonly menuPrinter: MenuPrinter,
    private readonly articleListUseCase: ArticleListUseCase,
    private readonly articleGetUseCase: ArticleGetUseCase,
    private readonly articleCreateUseCase: ArticleCreateUseCase
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

    if (!possibleAnswers.has(answer)) {
      this.cliInOut.print(this.menuPrinter.printWrongInput());
    }

    return answer;
  };

  public renderArticleDetail = async (
    selectedArticleId: number
  ): Promise<void> => {
    const article = this.articleGetUseCase.get(selectedArticleId);
    await this.cliInOut.printAndGet(
      this.menuPrinter.printArticleDetail(article)
    );
  };

  public rednerArticleForm = async (): Promise<void> => {
    const title = await this.cliInOut.printAndGet("제목: ", false);
    const content = await this.cliInOut.printAndGet("내용: ", false);

    const { id } = this.articleCreateUseCase.create({
      title,
      content,
    });

    await this.cliInOut.printAndGet(this.menuPrinter.printArticleSaved(id));
  };
}
