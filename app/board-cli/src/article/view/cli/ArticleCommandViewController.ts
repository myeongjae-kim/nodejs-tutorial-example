import { ArticleCreateUseCase } from "board-domain/dist/article/port/incoming/ArticleCreateUseCase";
import { CliInOut } from "../../../common/view/cli/CliInOut";
import { MenuPrinter } from "./MenuPrinter";

export class ArticleCommandViewController {
  constructor(
    private readonly cliInOut: CliInOut,
    private readonly menuPrinter: MenuPrinter,
    private readonly articleCreateUseCase: ArticleCreateUseCase
  ) {}

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
